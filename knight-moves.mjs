#!/usr/bin/env node

function knightMoves(start, end) {
  try {
    const board = [];
    for (let i = 0; i < 8; i++) {
      for (let j = 7; j > -1; j--) {
        const coordinates = [i, j];
        board.push(coordinates);
      }
    }

    const checkCoordinate = (coordinate, position) =>
      JSON.stringify(coordinate) === JSON.stringify(position);

    if (!board.some((coordinate) => checkCoordinate(coordinate, start))) {
      throw new Error('Invalid initial coordinate!');
    }

    if (!board.some((coordinate) => checkCoordinate(coordinate, end))) {
      throw new Error('Invalid final coordinate!');
    }
  } catch (e) {
    console.error(e);
  }
}

knightMoves();
