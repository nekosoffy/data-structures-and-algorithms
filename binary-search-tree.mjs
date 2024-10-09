#!/usr/bin/env node
import mergeSort from './mergeSort.mjs';

function tree(array) {
  function node(data = null) {
    return { data, leftChild: null, rightChild: null };
  }

  function buildTree(array) {
    try {
      if (!Array.isArray(array) || array.length === 0) {
        throw new TypeError('Input must be a non-empty array.');
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

      while (
        (currentNode.leftChild !== null || currentNode.rightChild !== null) &&
        currentNode.data !== value
      ) {
        if (value < currentNode.data) {
          currentNode = currentNode.leftChild;
        } else {
          currentNode = currentNode.rightChild;
        }
      }

      if (value === currentNode.data) {
        return;
      }

      const leafNode = node(value);

      if (value < currentNode.data) {
        currentNode.leftChild = leafNode;
      } else {
        currentNode.rightChild = leafNode;
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

  return { root, insert, deleteItem };
}

const binarySearchTree = tree([
  1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324,
]);

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
