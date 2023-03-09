// Game setup config
export const RED = "🔴";
export const YELLOW = "🟡";
export const BOARD_HEIGHT = 6;
export const BOARD_WIDTH = 7;

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

// use dropDisc to return a new game board state
export const dropDisc = (column: number, player: string, board: string[][]) => {
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

export const isColumnFilled = (board: string[][], column: number) => {
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

export const checkWinner = (player: string, board: string[][]) => {
  if (checkHorizontal(player, board)) return player;
  if (checkVertical(player, board)) return player;
  if (checkDiagonal(player, board)) return player;
  if (checkStalemate(board)) return "Stalemate";

  return "";
};
