const myBoard = document.querySelector(".board");

let gameOver = false;
let rows = 6;
let cols = 7;
let board = [];

window.onload = setBoard;

function setBoard() {
  for (let r = 0; r < rows; ++r) {
    let row = [];
    for (let c = 0; c < cols; ++c) {
      row.push(" ");
      const newCell = document.createElement("div");
      newCell.id = r.toString() + "-" + c.toString();
      newCell.classList.add("myCell");
      newCell.addEventListener("click", setPiece);
      myBoard.appendChild(newCell);
    }
    board.push(row);
  }
}

const player = ["Red", "Yellow"];
let currPlayer = player[Math.floor(Math.random() * player.length)];
let bounds = [5, 5, 5, 5, 5, 5, 5];
if (currPlayer == player[0]) {
  document.querySelector(".winner").innerHTML =
    currPlayer + "'s turn: " + `<img src="./assets/red-piece.png" width="14" />`;
} else {
  document.querySelector(".winner").innerHTML =
    currPlayer + "'s turn: " + `<img src="./assets/yellow-piece.png" width="14" />`;
}

function setPiece() {
  if (gameOver) {
    return;
  }

  let coords = this.id.split("-");
  let r = parseInt(coords[0]);
  let c = parseInt(coords[1]);

  r = bounds[c];
  let cell = document.getElementById(r.toString() + "-" + c.toString());
  board[r][c] = currPlayer;
  if (currPlayer == player[0]) {
    currPlayer = player[1];
    document.querySelector(".winner").innerHTML =
      currPlayer + "'s turn: " + `<img src="./assets/yellow-piece.png" width="14" />`;
    cell.style.backgroundColor = "red";
  } else {
    currPlayer = player[0];
    document.querySelector(".winner").innerHTML =
      currPlayer + "'s turn: " + `<img src="./assets/red-piece.png" width="14" />`;
    cell.style.backgroundColor = "yellow";
  }

  r -= 1;
  bounds[c] = r;
  checkWinner();
}

function checkWinner() {
  //horizontally
  for (let r = 0; r < rows; ++r) {
    for (let c = 0; c < cols - 3; ++c) {
      if (board[r][c] != " ") {
        if (
          board[r][c] == board[r][c + 1] &&
          board[r][c + 1] == board[r][c + 2] &&
          board[r][c + 2] == board[r][c + 3]
        ) {
          printWinner(r, c);
          return;
        }
      }
    }
  }

  //vertically
  for (let r = 0; r < rows - 3; ++r) {
    for (let c = 0; c < cols; ++c) {
      if (board[r][c] != " ") {
        if (
          board[r][c] == board[r + 1][c] &&
          board[r + 1][c] == board[r + 2][c] &&
          board[r + 2][c] == board[r + 3][c]
        ) {
          printWinner(r, c);
          return;
        }
      }
    }
  }

  //main diag
  for (let r = 0; r < rows - 3; ++r) {
    for (let c = 0; c < cols - 3; ++c) {
      if (board[r][c] != " ") {
        if (
          board[r][c] == board[r + 1][c + 1] &&
          board[r + 1][c + 1] == board[r + 2][c + 2] &&
          board[r + 2][c + 2] == board[r + 3][c + 3]
        ) {
          printWinner(r, c);
          return;
        }
      }
    }
  }

  //secondary diag
  for (let r = 0; r < rows - 3; ++r) {
    for (let c = 3; c < cols; ++c) {
      if (board[r][c] != " ") {
        if (
          board[r][c] == board[r + 1][c - 1] &&
          board[r + 1][c - 1] == board[r + 2][c - 2] &&
          board[r + 2][c - 2] == board[r + 3][c - 3]
        ) {
          printWinner(r, c);
          return;
        }
      }
    }
  }
}

function printWinner(r, c) {
  if (board[r][c] == player[0]) {
    document.querySelector(".winner").innerHTML =
      player[0].toUpperCase() + " Wins &#127881;";
  } else {
    document.querySelector(".winner").innerHTML =
      player[1].toUpperCase() + " Wins &#127881;";
  }

  gameOver = true;
  document.querySelector(".resetBtn").classList.add("toggle-button");
}

function resetGame() {
  window.location.reload();
}
