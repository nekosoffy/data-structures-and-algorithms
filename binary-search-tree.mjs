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
