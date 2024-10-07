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

  function set(key, value) {
    const hashCode = hash(key);
    if (hashTable[hashCode] === undefined) {
      const list = createLinkedList();
      list.append([key, value]);
      hashTable[hashCode] = list;
    } else {
      const list = hashTable[hashCode];
      const indexOfNodeWithSameKey = list.find(key);
      let inserted = false;

      if (indexOfNodeWithSameKey !== null) {
        list.removeAt(indexOfNodeWithSameKey);
        list.insertAt([key, value], indexOfNodeWithSameKey);
        inserted = true;
      }

      if (inserted === false) {
        list.append([key, value]);
      }

      hashTable[hashCode] = list;
      inserted = false;
      checkHashTableGrowth();
    }
  }

  function checkHashTableGrowth() {
    const capacity = hashTable.length;
    const loadFactor = 0.75;
    let entries = 0;

    hashTable.forEach((el) => {
      entries += el.size();
    });

    if (entries === capacity * loadFactor) {
      hashTable = hashTable.concat(Array(capacity));
    }
  }
}
