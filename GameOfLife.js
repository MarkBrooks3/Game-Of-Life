class GameOfLife {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = this.makeBoard();
  }

  makeBoard() {
    board = [];
    for (let i = 0; i < this.height; i++) {
      let row = [];
      for (let j = 0; j < this.width; j++) {
        row.push(0);
      }
      board.push(row);
    }
    return board;
  }

  getCell(row, col) {
    if (row >= this.height || col >= this.width || row < 0 || col < 0) {
      return 0;
    } else {
      return this.board[row][col];
    }
  }

  toggleCell(row, col) {
    this.board[row][col] = 1 - this.getCell(row, col);
  }

  checkNeighbors(row, col) {
    let livingNeighbors = 0;
    for (let i = row - 1; i <= row + 1; i++) {
      for (let j = col - 1; j <= col + 1; j++) {
        if (this.getCell(i, j) === 1) {
          livingNeighbors += 1;
        }
      }
    }
    return livingNeighbors - this.board[row][col];
  }

  playGame() {
    const newBoard = this.makeBoard();
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        let neighbors = this.checkNeighbors(i, j);
        if (this.getCell(i, j) === 0) {
          if (neighbors === 3) {
            newBoard[i][j] = 1;
          }
        } else {
          if (neighbors < 2 || neighbors > 3) {
            newBoard[i][j] = 0;
          } else {
            newBoard[i][j] = 1;
          }
        }
      }
    }
    this.board = newBoard;
  }
}
