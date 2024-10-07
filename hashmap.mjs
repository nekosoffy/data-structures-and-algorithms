#!/usr/bin/env node
import createLinkedList from './linked-list.mjs';

function hashMap() {
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

  function checkHashTableGrowth() {
    const capacity = hashTable.length;
    const loadFactor = 0.75;
    let entriesNumber = 0;

    hashTable.forEach((bucket) => {
      entriesNumber += bucket.size();
    });

    if (entriesNumber === capacity * loadFactor) {
      const entries = [];

      hashTable.forEach((bucket) => {
        for (let i = 0; i < bucket.size(); i++) {
          entries.push(bucket.at(i).value);
        }
      });

      hashTable = Array(capacity * 2);

      entries.forEach((entry) => {
        set(entry[0], entry[1]);
      });
    }
  }

  function set(key, value) {
    checkHashTableGrowth();
    const hashCode = hash(key);

    if (hashTable[hashCode] === undefined) {
      const bucket = createLinkedList();
      bucket.append([key, value]);
      hashTable[hashCode] = bucket;
    } else {
      const bucket = hashTable[hashCode];
      const indexOfNodeWithSameKey = bucket.find(key);

      if (indexOfNodeWithSameKey !== null) {
        bucket.removeAt(indexOfNodeWithSameKey);
        bucket.insertAt([key, value], indexOfNodeWithSameKey);
      } else {
        bucket.append([key, value]);
      }

      hashTable[hashCode] = bucket;
    }
  }

  function get(key) {
    let entryIndex;
    let value;
    for (const bucket of hashTable) {
      if (bucket !== undefined) {
        entryIndex = bucket.find(key);
        if (entryIndex !== null) {
          return bucket.at(entryIndex).value[1];
        }
      }
    }
    return null;
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
}
