#!/usr/bin/env node
function fibs(length) {
  if (!Number.isInteger(length) || length < 1) return;
  let sequence = [0, 1];

  for (let i = 2; i < length; i++) {
    sequence.push(sequence[i - 1] + sequence[i - 2]);
  }

  return sequence.slice(0, length);
}

function fibsRec(length) {
  console.log("This was printed recursively");
  if (!Number.isInteger(length) || length < 1) return;
  if (length <= 2) return [0, 1].slice(0, length);
  let sequence = fibsRec(length - 1);
  return sequence.concat(sequence.at(-1) + sequence.at(-2));
}

console.log(fibsRec(8));
