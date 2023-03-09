export default function GameEndingMessage(props: { winner: string }) {
  const { winner } = props;
  if (winner === "Stalemate" || winner === "") {
    return <span className='px-2 w-full text-center'>{winner}</span>;
  } else {
    return (
      <span className='px-2 w-full text-center blink'>{winner} WINS!!!</span>
    );
  }
}
