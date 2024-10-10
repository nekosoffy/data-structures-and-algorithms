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

  function updateMessage() {
    console.log('Updating tree...');
    prettyPrint();
  }

  function prettyPrint(node = root(), prefix = '', isLeft = true) {
    if (node === null) {
      return;
    }

    if (node.rightChild !== null) {
      prettyPrint(
        node.rightChild,
        `${prefix}${isLeft ? '│   ' : '    '}`,
        false
      );
    }

    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);

    if (node.leftChild !== null) {
      prettyPrint(node.leftChild, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
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
        console.log("Tree doesn't contain value.");
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

      while (
        currentNode.leftChild !== null &&
        currentNode.rightChild !== null &&
        currentNode.data !== value
      ) {
        if (value < currentNode.data) {
          currentNode = currentNode.leftChild;
        } else {
          currentNode = currentNode.rightChild;
        }
      }

      if (currentNode === null && currentNode === firstNode) {
        firstNode = node(value);
        return updateMessage();
      }

      if (currentNode.data === value) {
        console.log('Tree already contains value.');
        return;
      }

      if (value < currentNode.data) {
        currentNode.leftChild = node(value);
      } else {
        currentNode.rightChild = node(value);
      }

      return updateMessage();
    } catch (e) {
      console.error(e);
    }
  }

  function deleteItem(value) {
    try {
      if (!Number.isInteger(value)) {
        throw new TypeError('Input must be an integer.');
      }

      let currentNode = root();
      let parentNode = null;

      while (currentNode !== null && currentNode.data !== value) {
        parentNode = currentNode;
        currentNode =
          value < currentNode.data
            ? currentNode.leftChild
            : currentNode.rightChild;
      }

      // If value is not found.
      if (currentNode === null) {
        return "Tree doesn't contain value.";
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

      const hasLeftChild = currentNode.leftChild !== null;
      const hasRightChild = currentNode.rightChild !== null;

      // Case 1: Node to be deleted has no children.
      if (!hasLeftChild && !hasRightChild) {
        if (parentNode === null) {
          firstNode = null;
        } else {
          replaceChild(parentNode, currentNode, null);
        }
        return updateMessage(prettyPrint);
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
        return updateMessage(prettyPrint);
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
        return updateMessage(prettyPrint);
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

  function inOrder(callback) {
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

        if (currentNode.leftChild !== null) {
          queue.push(currentNode.leftChild);
          traverse(queue);
        }

        callback(currentNode);

        if (currentNode.rightChild !== null) {
          queue.push(currentNode.rightChild);
          traverse(queue);
        }
      }
      traverse(queue);
    } catch (e) {
      console.error(e);
    }
  }

  function preOrder(callback) {
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
          traverse(queue);
        }

        if (currentNode.rightChild !== null) {
          queue.push(currentNode.rightChild);
          traverse(queue);
        }
      }
      traverse(queue);
    } catch (e) {
      console.error(e);
    }
  }

  function postOrder(callback) {
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

        if (currentNode.leftChild !== null) {
          queue.push(currentNode.leftChild);
          traverse(queue);
        }

        if (currentNode.rightChild !== null) {
          queue.push(currentNode.rightChild);
          traverse(queue);
        }

        callback(currentNode);
      }
      traverse(queue);
    } catch (e) {
      console.error(e);
    }
  }

  function height(node) {
    if (
      node === null ||
      (node.leftChild === null && node.rightChild === null)
    ) {
      return 0;
    }

    let heightLeft = 0;
    let heightRight = 0;

    if (node.leftChild !== null) {
      heightLeft += height(node.leftChild);
    }

    if (node.rightChild !== null) {
      heightRight += height(node.rightChild);
    }

    return Math.max(heightLeft, heightRight) + 1;
  }

  return {
    root,
    updateMessage,
    insert,
    deleteItem,
    find,
    levelOrder,
    inOrder,
    preOrder,
    postOrder,
    height,
  };
}

const binarySearchTree = tree([
  1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324,
]);
