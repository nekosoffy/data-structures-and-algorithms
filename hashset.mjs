#!/usr/bin/env node
import createLinkedList from './linked-list.mjs';

function hashSet() {
  let hashTable = Array(16);

  function hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode =
        (primeNumber * hashCode + key.charCodeAt(i)) % hashTable.length;
    }

    return hashCode;
  }

  function length() {
    let entries = 0;
    hashTable.forEach(bucket => {
      for (let i = 0; i < bucket.size(); i++) {
        entries++;
      }
    });
    return entries;
  }

  function checkHashTableGrowth() {
    const capacity = hashTable.length;
    const loadFactor = 0.75;
    let entriesNumber = length();

    if (entriesNumber === capacity * loadFactor) {
      const entriesList = keys();
      hashTable = Array(capacity * 2);

      for (const key of entriesList) {
        set(key);
      }
    }
  }

  function set(key) {
    checkHashTableGrowth();
    const hashCode = hash(key);

    if (hashTable[hashCode] === undefined) {
      const bucket = createLinkedList();
      bucket.append(key);
      hashTable[hashCode] = bucket;
    } else {
      const bucket = hashTable[hashCode];
      const indexOfNodeWithSameKey = bucket.find(key);

      if (indexOfNodeWithSameKey !== null) {
        bucket.removeAt(indexOfNodeWithSameKey);
        bucket.insertAt(key, indexOfNodeWithSameKey);
      } else {
        bucket.append(key);
      }

      hashTable[hashCode] = bucket;
    }
  }

  function has(key) {
    let entryIndex;
    for (const bucket of hashTable) {
      if (bucket !== undefined) {
        entryIndex = bucket.find(key);
        if (entryIndex !== null) {
          return true;
        }
      }
    }
    return false;
  }

  function remove(key) {
    let entryIndex;
    for (const bucket of hashTable) {
      if (bucket !== undefined) {
        entryIndex = bucket.find(key);
        if (entryIndex !== null) {
          bucket.removeAt(entryIndex);

          if (bucket.head() === null) {
            delete hashTable[hashTable.indexOf(bucket)];
          }

          return true;
        }
      }
    }
    return false;
  }

  function clear() {
    hashTable = Array(hashTable.length);
  }

  function keys() {
    const keys = [];
    hashTable.forEach(bucket => {
      for (let i = 0; i < bucket.size(); i++) {
        keys.push(bucket.at(i).value);
      }
    });
    return keys;
  }

  function buckets() {
    hashTable.forEach(bucket => {
      console.log(bucket.toString());
    });
  }

  return { hash, length, checkHashTableGrowth, set, has, clear, keys, buckets };
}

const test = hashSet();
test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');
test.set('moon', 'silver');
test.buckets();
