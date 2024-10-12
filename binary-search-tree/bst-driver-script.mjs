#!/usr/bin/env node
import tree from './binary-search-tree.mjs';

function testBst() {
  function randomNumbersArray() {
    const array = Array.from({ length: 15 }, () =>
      Math.floor(Math.random() * 100)
    );
    return array;
  }

  function createTree() {
    return tree(randomNumbersArray());
  }

  function balanceStatus(tree) {
    const status = tree.isBalanced() === true ? 'balanced!' : 'unbalanced...';
    console.log(`Tree status: ${status}`);
  }

  function printOrders(tree) {
    let array = [];

    function print(node) {
      array.push(node.data);
    }

    function printArray() {
      console.log(array);
      array = Array(0);
    }

    console.log("Tree's nodes in level order:");
    tree.levelOrder(print);
    printArray();

    console.log("Tree's nodes in pre order:");
    tree.preOrder(print);
    printArray();

    console.log("Tree's nodes in post order:");
    tree.postOrder(print);
    printArray();

    console.log("Tree's nodes in order:");
    tree.inOrder(print);
    printArray();
  }

  function unbalanceTree(tree) {
    let array = [];
    for (let i = 0; i < 5; i++) {
      const randomNumber = Math.floor(Math.random() * 10000) + 101;
      tree.insert(randomNumber);
      array.push(randomNumber);
    }
    console.log(
      `The following nodes were added to the tree: ${array.join(', ')}.`
    );
  }

  function rebalanceTree(tree) {
    tree.rebalance();
    console.log('Balancing tree...');
  }

  function driverScript() {
    const bst = createTree();
    bst.updateMessage();
    console.log('');

    balanceStatus(bst);
    console.log('');

    printOrders(bst);
    console.log('');

    unbalanceTree(bst);
    console.log('');

    bst.updateMessage();
    console.log('');

    balanceStatus(bst);
    console.log('');

    rebalanceTree(bst);
    console.log('');

    bst.updateMessage();
    console.log('');

    balanceStatus(bst);
    console.log('');

    printOrders(bst);
    console.log('');
  }

  return { driverScript };
}

const test = testBst();
test.driverScript();
