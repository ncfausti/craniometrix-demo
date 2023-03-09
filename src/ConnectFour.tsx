const ConnectFour = (props: { board: string[][] }) => {
  const { board } = props;

  const renderBoard = () => {
    return board.map((row, rowIndex) => (
      <div className='flex' key={rowIndex}>
        {row.map((cell, columnIndex) => (
          <span
            key={`${rowIndex}-${columnIndex}`}
            className='cell flex-grow align-center text-center'
          >
            {board[rowIndex][columnIndex] === null
              ? "⚪️"
              : board[rowIndex][columnIndex]}{" "}
          </span>
        ))}
      </div>
    ));
  };

  return (
    <div className='Board'>
      <div>{renderBoard()}</div>
    </div>
  );
};

export default ConnectFour;
