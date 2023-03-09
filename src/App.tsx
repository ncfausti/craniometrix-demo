import React, { useState } from "react";
import "./Board.css";
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

const ConnectFour = (props: { board: string[][] }) => {
  const { board } = props;

  const renderBoard = () => {
    return board.map((row, rowIndex) => (
      <div key={rowIndex}>
        {row.map((cell, columnIndex) => (
          <span key={`${rowIndex}-${columnIndex}`} className='cell'>
            {board[rowIndex][columnIndex] === null
              ? "⚪️"
              : board[rowIndex][columnIndex]}{" "}
          </span>
        ))}
      </div>
    ));
  };

  return <div>{renderBoard()}</div>;
};

export default function App(props: any) {
  const RED = "🔴";
  const YELLOW = "🟡";
  const BOARD_HEIGHT = 6;
  const BOARD_WIDTH = 7;

  // check for horizontal wins
  const checkHorizontal = (player: string, board: string[][]) => {
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col <= board[row].length - 4; col++) {
        if (
          board[row][col] === player &&
          board[row][col + 1] === player &&
          board[row][col + 2] === player &&
          board[row][col + 3] === player
        ) {
          return true;
        }
      }
    }
    return false;
  };

  // check for vertical wins
  const checkVertical = (player: string, board: string[][]) => {
    for (let row = 0; row <= board.length - 4; row++) {
      for (let col = 0; col < board[row].length; col++) {
        if (
          board[row][col] === player &&
          board[row + 1][col] === player &&
          board[row + 2][col] === player &&
          board[row + 3][col] === player
        ) {
          return true;
        }
      }
    }
    return false;
  };

  // check for diagonal wins (bottom-left to top-right)
  const checkDiagonal = (player: string, board: string[][]) => {
    for (let row = 0; row <= board.length - 4; row++) {
      for (let col = 0; col <= board[row].length - 4; col++) {
        if (
          board[row][col] === player &&
          board[row + 1][col + 1] === player &&
          board[row + 2][col + 2] === player &&
          board[row + 3][col + 3] === player
        ) {
          return true;
        }
      }
    }
    return false;
  };

  const checkWinner = (player: string, board: string[][]) => {
    if (checkHorizontal(player, board)) return player;
    if (checkVertical(player, board)) return player;
    if (checkDiagonal(player, board)) return player;

    return "";
  };

  // use dropDisc to return a new game board state
  const dropDisc = (column: number, player: string, board: string[][]) => {
    // start at the bottom of the column and search for the first empty slot
    for (let row = board.length - 1; row >= 0; row--) {
      if (board[row][column] === null) {
        // found an empty slot, drop the disc in this position
        board[row][column] = player;
        return board; // return the row number where the disc was placed
      }
    }

    // if the column is full, return new board
    return new Array(BOARD_HEIGHT)
      .fill(null)
      .map(() => new Array(BOARD_WIDTH).fill(null));
  };

  const [gameState, setGameState] = useState({
    turn: RED,
    board: new Array(BOARD_HEIGHT)
      .fill(null)
      .map(() => new Array(BOARD_WIDTH).fill(null)),
    winner: "",
  });

  const handleClick = () => {
    // Create a copy of the gameState object
    const updatedGameState = { ...gameState };
    const currentTurn = updatedGameState.turn;

    // Update the game state by dropping a disc
    updatedGameState.board = dropDisc(0, currentTurn, gameState.board);

    // Check for winner
    updatedGameState.winner = checkWinner(currentTurn, updatedGameState.board);

    // Update who's turn it is
    // updatedGameState.turn = gameState.turn === RED ? YELLOW : RED;

    // Set new gameState
    setGameState(updatedGameState);
  };

  return (
    <div className='App'>
      connect-four
      <p>Player's turn: {gameState.turn}</p>
      <p>Winner: {gameState.winner}</p>
      <button
        onClick={handleClick}
        disabled={gameState.winner === "" ? false : true}
      >
        swap turn
      </button>
      <div className='Board'>
        <ConnectFour board={gameState.board} />
      </div>
    </div>
  );
}
