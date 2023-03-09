import React, { useState } from "react";
import "./App.css";
import ConnectFour from "./ConnectFour";
import {
  BOARD_HEIGHT,
  BOARD_WIDTH,
  checkWinner,
  dropDisc,
  isColumnFilled,
  RED,
  YELLOW,
} from "./Rules";
import Scoreboard from "./Scoreboard";

export default function App(props: any) {
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

  return (
    <div className='flex flex-col justify-center'>
      <Scoreboard winner={gameState.winner} turn={gameState.turn} />
      <div className='flex flex-col justify-center'>
        {/* Buttons to drop in specific column */}
        <div className='Buttons flex'>
          {new Array(BOARD_WIDTH).fill(null).map((_, i) => (
            <button
              type='button'
              className='flex-grow basis-0 rounded-l-md bg-white  py-2 font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10'
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
        {/* / Drop Buttons */}
        <ConnectFour board={gameState.board} />
        <RestartGame winner={gameState.winner} />
      </div>
    </div>
  );
}

const RestartGame = (props: { winner: string }) => {
  const { winner } = props;
  return (
    <div className='EndGame'>
      <button
        type='button'
        className='bg-white py-2.5 px-3.5 font-semibold shadow-sm w-full'
        disabled={winner === ""}
        onClick={() => window.location.reload()}
      >
        Restart Game
      </button>
    </div>
  );
};
