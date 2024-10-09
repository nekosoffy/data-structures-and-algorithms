#!/usr/bin/env node
import mergeSort from './mergeSort.mjs';

function tree(array) {
  function node(data = null) {
    return { data, leftChild: null, rightChild: null };
  }

  function buildTree(array) {
    try {
      if (!Array.isArray(array) || !array.every(Number.isInteger)) {
        throw new TypeError('Input must be an array of integers.');
      }

      array = [...new Set(array)];
      array = mergeSort(array);

      if (array.length === 1) {
        return node(array[0]);
      }

      const mid = Math.floor(array.length / 2);
      let rootNode = node(array[mid]);

      if (array.length > 2) {
        const left = array.slice(0, mid);
        const right = array.slice(mid + 1);
        rootNode.leftChild = buildTree(left);
        rootNode.rightChild = buildTree(right);
      } else {
        const right = [array[1]];
        rootNode = node(array[0]);
        rootNode.rightChild = buildTree(right);
      }

      return rootNode;
    } catch (e) {
      console.error(e);
    }
  }

  let firstNode = buildTree(array);

  function root() {
    return firstNode;
  }

  function replaceChild(parentNode, oldChild, newChild) {
    if (parentNode.leftChild === oldChild) {
      parentNode.leftChild = newChild;
    } else {
      parentNode.rightChild = newChild;
    }
  }

  function findNextSmallerChild(node) {
    let nextSmaller = node.rightChild;
    let parentOfNextSmaller = node;

    while (nextSmaller.leftChild !== null) {
      parentOfNextSmaller = nextSmaller;
      nextSmaller = nextSmaller.leftChild;
    }

    if (nextSmaller !== node.rightChild) {
      parentOfNextSmaller.leftChild = nextSmaller.rightChild;
      nextSmaller.rightChild = node.rightChild;
    }

    return nextSmaller;
  }

  function find(value) {
    try {
      if (!Number.isInteger(value)) {
        throw new TypeError('Input must be an integer.');
      }

      let currentNode = root();

      while (currentNode !== null && currentNode.data !== value) {
        currentNode =
          value < currentNode.data
            ? currentNode.leftChild
            : currentNode.rightChild;
      }

      if (currentNode === null) {
        return "Tree doesn't contain value.";
      }

      return currentNode;
    } catch (e) {
      console.error(e);
    }
  }

  function insert(value) {
    try {
      if (!Number.isInteger(value)) {
        throw new TypeError('Input must be an integer.');
      }

      let currentNode = root();

      while (currentNode !== null && currentNode.data !== value) {
        if (value < currentNode.data) {
          currentNode = currentNode.leftChild;
        } else {
          currentNode = currentNode.rightChild;
        }
      }

      if (currentNode === null) {
        firstNode = node(value);
        return;
      } else if (currentNode.data === value) {
        return 'Tree already contains value.';
      }

      if (value < currentNode.data) {
        currentNode.leftChild = node(value);
      } else {
        currentNode.rightChild = node(value);
      }
    } catch (e) {
      console.error(e);
    }
  }

  function deleteItem(value) {
    try {
      if (!Number.isInteger(value)) {
        throw new TypeError('Input must be an integer.');
      }

      let currentNode = find(value);
      let parentNode = null;

      const hasLeftChild = currentNode.leftChild !== null;
      const hasRightChild = currentNode.rightChild !== null;

      // Case 1: Node to be deleted has no children.
      if (!hasLeftChild && !hasRightChild) {
        if (parentNode === null) {
          firstNode = null;
        } else {
          replaceChild(parentNode, currentNode, null);
        }
        return;
      }

      // Case 2: Node to be deleted has one child.
      if (!hasLeftChild || !hasRightChild) {
        const child = hasLeftChild
          ? currentNode.leftChild
          : currentNode.rightChild;

        if (parentNode === null) {
          firstNode = child;
        } else {
          replaceChild(parentNode, currentNode, child);
        }
        return;
      }

      // Case 3: Node to be deleted has both children.
      if (hasLeftChild && hasRightChild) {
        const nextSmallerChild = findNextSmallerChild(currentNode);
        nextSmallerChild.leftChild = currentNode.leftChild;

        if (parentNode === null) {
          firstNode = nextSmallerChild;
        } else {
          replaceChild(parentNode, currentNode, nextSmallerChild);
        }
        return;
      }
    } catch (e) {
      console.error(e);
    }
  }

  function levelOrder(callback) {
    try {
      if (typeof callback !== 'function') {
        throw new TypeError('Input must be a function.');
      }

      if (firstNode === null) {
        throw new Error('Tree has no nodes.');
      }

      const queue = [firstNode];

      function traverse(queue) {
        if (queue.length === 0) {
          return;
        }

        let currentNode = queue.shift();
        callback(currentNode);

        if (currentNode.leftChild !== null) {
          queue.push(currentNode.leftChild);
        }

        if (currentNode.rightChild !== null) {
          queue.push(currentNode.rightChild);
        }

        traverse(queue);
      }

      traverse(queue);
    } catch (e) {
      console.error(e);
    }
  }

  return { root, insert, deleteItem, find, levelOrder };
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node == null) {
    return;
  }
  if (node.rightChild !== null) {
    prettyPrint(node.rightChild, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.leftChild !== null) {
    prettyPrint(node.leftChild, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

prettyPrint(binarySearchTree.root());
