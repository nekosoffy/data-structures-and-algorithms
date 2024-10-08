#!/usr/bin/env node
export default function mergeSort(array) {
  if (array.length <= 1) return array;
  let left = array.slice(0, array.length / 2);
  let right = array.slice(array.length / 2);

  if (left.length > 1) {
    left = mergeSort(left);
  }

  if (right.length > 1) {
    right = mergeSort(right);
  }

  function merge(left, right) {
    const sortedArray = [];

    if (left.length > 0 && right.length > 0) {
      if (left[0] < right[0]) {
        sortedArray.push(left.shift());
      } else {
        sortedArray.push(right.shift());
      }
      return sortedArray.concat(merge(left, right));
    }

    if (left.length === 0) return sortedArray.concat(right);
    if (right.length === 0) return sortedArray.concat(left);
  }

  return merge(left, right);
}
