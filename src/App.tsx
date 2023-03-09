import React, { useState } from "react";
import "./App.css";

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

    // check for diagonal wins (top-left to bottom-right)
    for (let row = 3; row < board.length; row++) {
      for (let col = 0; col <= board[row].length - 4; col++) {
        if (
          board[row][col] === player &&
          board[row - 1][col + 1] === player &&
          board[row - 2][col + 2] === player &&
          board[row - 3][col + 3] === player
        ) {
          return true;
        }
      }
    }
    return false;
  };

  const checkStalemate = (board: string[][]) => {
    // check if there are any empty cells left on the board
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        if (board[row][col] === null) {
          return false;
        }
      }
    }
    // if all cells are filled, return true (stalemate)
    return true;
  };

  const isColumnFilled = (board: string[][], column: number) => {
    // iterate over cells in the specified column
    for (let row = 0; row < board.length; row++) {
      if (board[row][column] === null) {
        // if any cell in the column is empty, return false
        return false;
      }
    }
    // if all cells in the column are filled, return true
    return true;
  };

  const checkWinner = (player: string, board: string[][]) => {
    if (checkHorizontal(player, board)) return player;
    if (checkVertical(player, board)) return player;
    if (checkDiagonal(player, board)) return player;
    if (checkStalemate(board)) return "Stalemate";

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

  const handleClick = (col: number) => {
    // Create a copy of the gameState object
    const updatedGameState = { ...gameState };
    const currentTurn = updatedGameState.turn;

    // Update the game state by dropping a disc
    updatedGameState.board = dropDisc(col, currentTurn, gameState.board);

    // Check for winner
    updatedGameState.winner = checkWinner(currentTurn, updatedGameState.board);

    // Update who's turn it is
    updatedGameState.turn = gameState.turn === RED ? YELLOW : RED;

    // Set new gameState
    setGameState(updatedGameState);
  };

  // Change the color of the scoreboard shadow based on
  // player's turn or winner
  const scoreboardClass =
    gameState.winner === ""
      ? `ScoreBoard ${gameState.turn}`
      : `ScoreBoard Winner ${gameState.winner}`;

  return (
    <div className='App'>
      <div className={scoreboardClass}>
        <strong>connect-four</strong>
        <p>Player's turn: {gameState.turn}</p>
        {gameState.winner && <p>Winner: {gameState.winner} </p>}
        <button
          className={"Restart"}
          disabled={gameState.winner === ""}
          onClick={() => window.location.reload()}
        >
          Restart Game
        </button>
      </div>
      <div className='Game'>
        <div className='Buttons'>
          {new Array(BOARD_WIDTH).fill(null).map((_, i) => (
            <button
              key={i}
              onClick={() => handleClick(i)}
              disabled={
                gameState.winner !== "" || isColumnFilled(gameState.board, i)
                  ? true
                  : false
              }
            >
              {"🫳"}
            </button>
          ))}
        </div>
        <div className='Board'>
          <ConnectFour board={gameState.board} />
        </div>
      </div>
    </div>
  );
}
