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

    if (
      !board.some(
        coordinate => JSON.stringify(coordinate) === JSON.stringify(start),
      )
    ) {
      throw new Error('Invalid initial coordinate!');
    }

    if (
      !board.some(
        coordinate => JSON.stringify(coordinate) === JSON.stringify(end),
      )
    ) {
      throw new Error('Invalid final coordinate!');
    }

    function movement(start) {
      const initialPos = start;
      let possibleEnds = [
        [initialPos[0] - 2, initialPos[1] - 1],
        [initialPos[0] - 2, initialPos[1] + 1],
        [initialPos[0] - 1, initialPos[1] - 2],
        [initialPos[0] - 1, initialPos[1] + 2],
        [initialPos[0] + 1, initialPos[1] - 2],
        [initialPos[0] + 1, initialPos[1] + 2],
        [initialPos[0] + 2, initialPos[1] - 1],
        [initialPos[0] + 2, initialPos[1] + 1],
      ];

      possibleEnds = possibleEnds.filter(coordinates => {
        for (let value of coordinates) {
          if (value < 0 || value > 7) {
            return false;
          }
        }

        return true;
      });

      return possibleEnds;
    }

    return { movement };
  } catch (e) {
    console.error(e);
  }
}
