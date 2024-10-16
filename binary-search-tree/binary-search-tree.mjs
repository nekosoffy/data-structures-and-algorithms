#!/usr/bin/env node
import mergeSort from '../algorithms/mergeSort.mjs';

export default function tree(array) {
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
    console.log('Updated tree:');
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
        false,
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

      if (currentNode === null) {
        firstNode = node(value);
        return;
      }

      while (currentNode.data !== value) {
        if (value < currentNode.data) {
          if (currentNode.leftChild !== null) {
            currentNode = currentNode.leftChild;
          } else {
            break;
          }
        } else if (value > currentNode.data) {
          if (currentNode.rightChild !== null) {
            currentNode = currentNode.rightChild;
          } else {
            break;
          }
        }
      }

      if (currentNode.data === value) {
        console.log('Tree already contains value.');
        return;
      }

      if (currentNode.data > value) {
        currentNode.leftChild = node(value);
        return;
      }

      if (currentNode.data < value) {
        currentNode.rightChild = node(value);
        return;
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
    try {
      if (typeof node !== 'object' && node === null) {
        throw new TypeError('Invalid input.');
      }

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
    } catch (e) {
      console.error(e);
    }
  }

  function depth(node) {
    try {
      if (typeof node !== 'object' && node === null) {
        throw new TypeError('Invalid input.');
      }
      let currentNode = root();
      let height = 0;

      while (currentNode !== null && currentNode !== node) {
        currentNode =
          node.data < currentNode.data
            ? currentNode.leftChild
            : currentNode.rightChild;
        height++;
      }

      return height;
    } catch (e) {
      console.error(e);
    }
  }

  function isBalanced() {
    function traverse(node) {
      if (node === null) {
        return { balanced: true, height: 0 };
      }

      const left = traverse(node.leftChild);
      const right = traverse(node.rightChild);

      if (!left.balanced || !right.balanced) {
        return { balanced: false, height: 0 };
      }

      const isCurrentBalanced = Math.abs(left.height - right.height) <= 1;

      return {
        balanced: isCurrentBalanced,
        height: Math.max(left.height, right.height) + 1,
      };
    }

    return traverse(firstNode).balanced;
  }

  function rebalance() {
    const array = [];

    function pushNode(node) {
      array.push(node.data);
    }

    inOrder(pushNode);
    firstNode = buildTree(array);
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
    depth,
    isBalanced,
    rebalance,
  };
}
