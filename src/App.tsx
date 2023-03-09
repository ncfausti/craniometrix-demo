import React, { useState } from "react";

// You should display the current player’s turn
// - Only one disc can be dropped in each turn
// - For each turn, a player should select a column and their disc should drop to the
// next empty spot in that column
// - Players must connect 4 of their colored discs in a row to win (either horizontally,
// vertically, or diagonally)
// - The game ends when there is a 4-in-a-row, or if all spots are occupied by a disc
// (stalemate)
// - When the game ends, you should stop receiving input from either user, display a
// message indicating who won the game (or that it was a stalemate game), and be
// able to start a new game

const RED = "🔴";
const BLUE = "🔵";
const EMPTY = "⚪️";

const dropDisc = (column: number, player: string, board: string | any[]) => {
  // start at the bottom of the column and search for the first empty slot
  for (let row = board.length - 1; row >= 0; row--) {
    if (board[row][column] === EMPTY) {
      // found an empty slot, drop the disc in this position
      board[row][column] = player;
      return row; // return the row number where the disc was placed
    }
  }
  // if the column is full, return -1 to indicate that the move is invalid
  return -1;
};

const ConnectFourBoard = () => {
  const BOARD_HEIGHT = 6;
  const BOARD_WIDTH = 7;

  const [board, setBoard] = useState(
    new Array(BOARD_HEIGHT).fill(null).map(() => new Array(BOARD_WIDTH).fill(EMPTY))
  );

  console.log(dropDisc(0, RED, board));
  console.log(dropDisc(0, BLUE, board));
  console.log(dropDisc(6, BLUE, board));

  console.log(board);
  const renderBoard = () => {
    return board.map((row, rowIndex) => (
      <div key={rowIndex}>
        {row.map((cell, columnIndex) => (
          <span key={`${rowIndex}-${columnIndex}`} className="cell">
            {board[rowIndex][columnIndex] === null
              ? EMPTY
              : board[rowIndex][columnIndex]}{" "}
          </span>
        ))}
      </div>
    ));
  };

  return <div className="board">{renderBoard()}</div>;
};

export default function App(props: any) {
  return (
    <div className="App">
      connect-four
      <ConnectFourBoard />
    </div>
  );
}
