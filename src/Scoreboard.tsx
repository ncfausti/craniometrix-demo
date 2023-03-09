import GameEndingMessage from "./GameEndingMessage";

// Change the color of the scoreboard shadow based on
// player's turn or winner

const Scoreboard = (props: { turn: string; winner: string }) => {
  const { turn, winner } = props;
  const scoreboardClass =
    winner === "" ? `ScoreBoard ${turn}` : `ScoreBoard Winner ${winner}`;
  return (
    <div className={scoreboardClass + " bg-white p-5"}>
      <strong>connect-four</strong>
      <GameEndingMessage winner={winner} />
      <div className='px-1'>{turn}'s turn </div>
    </div>
  );
};

export default Scoreboard;
