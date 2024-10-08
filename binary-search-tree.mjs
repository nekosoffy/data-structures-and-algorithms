#!/usr/bin/env node
import mergeSort from './mergeSort.mjs';

function node(data = null) {
  return { data, leftChild: null, rightChild: null };
}

function buildTree(array) {
  if (!Array.isArray(array) || array.length === 0) {
    throw new TypeError('Invalid input.');
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
}

function tree(array) {
  try {
    const root = buildTree(array);
    return root;
  } catch (e) {
    console.error(e);
  }
}

const result = tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
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

prettyPrint(result);
