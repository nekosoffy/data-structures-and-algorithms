#!/usr/bin/env node

function knightMoves(start, end) {
  try {
    const board = [];
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const coordinates = [i, j];
        board.push(coordinates);
      }
    }

    function compare(firstArray, secondArray) {
      return (
        firstArray[0] === secondArray[0] && firstArray[1] === secondArray[1]
      );
    }

    if (!board.some(coordinate => compare(coordinate, start))) {
      throw new Error('Invalid initial coordinate!');
    }

    if (!board.some(coordinate => compare(coordinate, end))) {
      throw new Error('Invalid final coordinate!');
    }

    function getPossibleMoves(start) {
      const initialPos = start;
      let possibleMoves = [
        [initialPos[0] - 2, initialPos[1] - 1],
        [initialPos[0] - 2, initialPos[1] + 1],
        [initialPos[0] - 1, initialPos[1] - 2],
        [initialPos[0] - 1, initialPos[1] + 2],
        [initialPos[0] + 1, initialPos[1] - 2],
        [initialPos[0] + 1, initialPos[1] + 2],
        [initialPos[0] + 2, initialPos[1] - 1],
        [initialPos[0] + 2, initialPos[1] + 1],
      ];

      possibleMoves = possibleMoves.filter(coordinates => {
        for (const value of coordinates) {
          if (value < 0 || value > 7) {
            return false;
          }
        }

        return true;
      });

      return possibleMoves;
    }

    function bFSearch(start, end) {
      const queue = [start];
      const visited = [start];
      const path = [];

      function traverse(queue) {
        if (queue.length === 0) {
          return;
        }

        let currentNode = queue.shift();

        if (compare(currentNode, end)) {
          path.push([currentNode[0], currentNode[1]]);
          while (currentNode.parentNode) {
            path.push([currentNode.parentNode[0], currentNode.parentNode[1]]);
            currentNode = currentNode.parentNode;
          }
        }

        const possibleMoves = getPossibleMoves(currentNode);

        for (const coordinate of possibleMoves) {
          if (!visited.some(square => compare(square, coordinate))) {
            coordinate.parentNode = currentNode;
            visited.push(coordinate);
            queue.push(coordinate);
            traverse(queue);
          }
        }
      }

      traverse(queue);
      return path;
    }

    function logResult(start, end) {
      const path = bFSearch(start, end);
      path.pop();
      console.log(
        `You made it to the destination in ${path.length - 1} moves!`,
      );
      console.log(`Here's your trajectory:`);
      console.log(`Start: (${path.at(-1).join(', ')})`);
      for (const coordinates of path) {
        if (coordinates === path.at(-1)) {
          console.log(
            `${path.indexOf(coordinates) + 1}: (${coordinates.join(
              ', ',
            )}) -> End!`,
          );
          return;
        }
        console.log(
          `${path.indexOf(coordinates) + 1}: (${coordinates.join(', ')})`,
        );
      }
    }

    return logResult(start, end);
  } catch (e) {
    console.error(e);
  }
}
