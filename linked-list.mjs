#!/usr/bin/env node
function createNode() {
  const value = null;
  const nextNode = null;

  return { value, nextNode };
}

export default function createLinkedList() {
  let firstNode = null;
  let lastNode = null;

  function append(value) {
    const newNode = createNode();
    newNode.value = value;

    if (firstNode === null) {
      firstNode = newNode;
      lastNode = newNode;
    } else {
      lastNode.nextNode = newNode;
      lastNode = newNode;
    }
  }

  function prepend(value) {
    const newNode = createNode();
    newNode.value = value;

    if (firstNode === null) {
      firstNode = newNode;
      lastNode = newNode;
    } else {
      newNode.nextNode = firstNode;
      firstNode = newNode;
    }
  }

  function size() {
    let size = 0;
    let current = head();

    while (current !== null) {
      size++;
      current = current.nextNode;
    }

    return size;
  }

  function head() {
    return firstNode;
  }

  function tail() {
    return lastNode;
  }

  function at(index) {
    const listSize = size();
    if (
      (index > listSize - 1 && listSize > 0) ||
      index < 0 ||
      !Number.isInteger(index)
    ) {
      console.log('Invalid index.');
      return;
    }

    let currentIndex = 0;
    let currentNode = head();

    while (currentNode !== null) {
      if (currentIndex === index) {
        return currentNode;
      }

      currentNode = currentNode.nextNode;
      currentIndex++;
    }

    return null;
  }

  function pop() {
    if (size() === 1) {
      firstNode = null;
      lastNode = null;
    } else {
      const newTail = at(size() - 2);
      newTail.nextNode = null;
      lastNode = newTail;
    }
  }

  function contains(value) {
    let currentNode = head();

    while (currentNode !== null) {
      if (currentNode.value === value) {
        return true;
      }

      currentNode = currentNode.nextNode;
    }

    return false;
  }

  function find(value) {
    let currentNode = head();
    let index = 0;

    while (currentNode !== null) {
      if (
        currentNode.value === value ||
        (Array.isArray(currentNode.value) && currentNode.value.includes(value))
      ) {
        return index;
      }

      currentNode = currentNode.nextNode;
      index++;
    }

    return null;
  }

  function toString() {
    let string = '';
    let current = head();

    while (current !== null) {
      if (Array.isArray(current.value)) {
        string += `( [${current.value.join(', ')}] ) -> `;
      } else if (typeof current.value === 'object') {
        const objectKey = Object.values(current.value)[0];
        const objectValue = Object.values(current.value)[1];
        string += `( { ${objectKey}: ${objectValue} } ) -> `;
      } else {
        string += `( ${current.value} ) -> `;
      }
      current = current.nextNode;
    }

    string += 'null';
    return string;
  }

  function insertAt(value, index) {
    if (index < 0 || !Number.isInteger(index)) {
      console.log('Invalid index.');
      return;
    }

    const newNode = createNode();
    newNode.value = value;
    const listSize = size();

    if (index === 0) {
      newNode.nextNode = at(index);
      firstNode = newNode;
    } else if (index === listSize - 1) {
      at(index - 1).nextNode = newNode;
      lastNode = newNode;
    } else {
      at(index - 1).nextNode = newNode;
      newNode.nextNode = at(index + 1);
    }
  }

  function removeAt(index) {
    const listSize = size();
    if (
      (index > listSize - 1 && listSize > 0) ||
      index < 0 ||
      !Number.isInteger(index)
    ) {
      console.log('Invalid index.');
      return;
    }

    if (index === 0 && listSize === 1) {
      firstNode = null;
    } else if (index === 0 && listSize > 1) {
      firstNode = at(index + 1);
    } else if (index === listSize - 1) {
      lastNode = at(index - 1);
      lastNode.nextNode = null;
    } else {
      at(index - 1).nextNode = at(index + 1);
    }
  }

  return {
    append,
    prepend,
    size,
    head,
    tail,
    at,
    pop,
    contains,
    find,
    toString,
    insertAt,
    removeAt,
  };
}
