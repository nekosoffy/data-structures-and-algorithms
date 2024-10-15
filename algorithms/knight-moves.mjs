#!/usr/bin/env node
function knightMoves(start, end) {
  try {
    if (start[0] > 7 || start[0] < 0) {
      throw new Error('Invalid initial coordinate!');
    }

    if (start[1] > 7 || start[1] < 0) {
      throw new Error('Invalid final coordinate!');
    }

    function getPossibleMoves(start) {
      let possibleMoves = [
        [start[0] - 2, start[1] - 1],
        [start[0] - 2, start[1] + 1],
        [start[0] - 1, start[1] - 2],
        [start[0] - 1, start[1] + 2],
        [start[0] + 1, start[1] - 2],
        [start[0] + 1, start[1] + 2],
        [start[0] + 2, start[1] - 1],
        [start[0] + 2, start[1] + 1],
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

    function compare(firstArray, secondArray) {
      return (
        firstArray[0] === secondArray[0] && firstArray[1] === secondArray[1]
      );
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
      const path = bFSearch(start, end).reverse();

      if (path.length === 2) {
        console.log(`You made it to the destination in 1 move!`);
      } else {
        console.log(
          `You made it to the destination in ${path.length - 1} moves!`,
        );
      }

      console.log(`Here's your trajectory:`);

      if (path.length === 1) {
        console.log(`Start: (${path[0].join(', ')}) -> End`);
      } else {
        console.log(`Start: (${path[0].join(', ')})`);
      }

      for (const coordinates of path.slice(1)) {
        if (coordinates === path.at(-1)) {
          console.log(
            `${path.indexOf(coordinates)}: (${coordinates.join(', ')}) -> End!`,
          );
          return;
        }

        console.log(
          `${path.indexOf(coordinates)}: (${coordinates.join(', ')})`,
        );
      }
    }

    return logResult(start, end);
  } catch (e) {
    console.error(e);
  }
}

knightMoves([0, 0], [7, 5]);
