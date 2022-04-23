// Elements from HTML
const cells = document.querySelectorAll(".cell");
const line = document.getElementById("line");
const gameResultsArea = document.getElementById("game-results-area");
const gameOverMessage = document.getElementById("win-lose-text");
const playAgain = document.getElementById("play-again");
const playerX = "X";
const playerO = "O";

// Set turn to player X
let turn = playerX;

// Track board status
const boardStatus = Array(cells.length);
boardStatus.fill(null);

// Add event listener to all of the cells on the board
cells.forEach((cell) => cell.addEventListener("click", cellClick));

// callback function cellClick
function cellClick(event) {
  if (gameOverMessage.classList.contains("visible")) {
    return;
  }

  const cell = event.target;
  // When you want to store extra information that doesn't have visual representation, data-* global attributes form a class of attributes called custom data attributes, that allow proprietary information to be exchanged between the HTML and its DOM representation by scripts. -mdn web docs. In this case, I used the dataset.indexNumber (javascript) data-index-number (HTML) to assign an index number to each cell in my array that makes up the Tic Tac Toe board.
  const cellNumber = cell.dataset.indexNumber;
  if (cell.innerText != "") {
    return;
  }

  if (turn === playerX) {
    cell.innerText = playerX;
    boardStatus[cellNumber - 1] = playerX;
    console.log(boardStatus);
    turn = playerO;
    console.log(turn);
  } else {
    cell.innerText = playerO;
    boardStatus[cellNumber - 1] = playerO;
    console.log(boardStatus);
    turn = playerX;
    console.log(turn);
  }

  checkForWinner();
}

// Defining all the winning combinations possible that will be checked each time a click event takes place in one of the cells.
const winningCombos = [
  // Rows
  { combo: [1, 2, 3], lineClass: "line-across-1" },
  { combo: [4, 5, 6], lineClass: "line-across-2" },
  { combo: [7, 8, 9], lineClass: "line-across-3" },
  // Columns
  { combo: [1, 4, 7], lineClass: "line-down-1" },
  { combo: [2, 5, 8], lineClass: "line-down-2" },
  { combo: [3, 6, 9], lineClass: "line-down-3" },
  // Diagonals
  { combo: [1, 5, 9], lineClass: "line-diagonal-1" },
  { combo: [3, 5, 7], lineClass: "line-diagonal-2" },
];

// Check for a winner or draw function is declared
function checkForWinner() {
  // check for Winner
  // The for...of statements combo iterates (loops) over the values of any iterable and became available with ES6 (JavaScript 2015). This form of loop allows a return statement to build a way to break out of the loop. -w3schools
  for (const winningCombo of winningCombos) {
    const combo = winningCombo.combo;
    const lineClass = winningCombo.lineClass;
    const cellValue1 = boardStatus[combo[0] - 1];
    const cellValue2 = boardStatus[combo[1] - 1];
    const cellValue3 = boardStatus[combo[2] - 1];
    if (
      cellValue1 != null &&
      cellValue1 === cellValue2 &&
      cellValue1 === cellValue3
    ) {
      line.classList.add(lineClass);
      gameOverWindow(cellValue1);
      return;
    }
  }
  // check for Draw
  // The every() method tests whether all elements in the array pass the test implemented by the provided function. It returns a Boolean value. - mdn
  const fullBoard = boardStatus.every((cell) => cell != null);
  if (fullBoard) {
    gameOverWindow(null);
  }
}

function gameOverWindow(winnerText) {
  let text = "Draw!";
  if (winnerText != null) {
    text = `${winnerText} Wins!`;
  }
  gameResultsArea.className = "visible";
  gameOverMessage.innerText = text;
}

playAgain.addEventListener("click", newGame);
function newGame() {
  line.className = "line";
  gameResultsArea.className = "hidden";
  boardStatus.fill(null);
  cells.forEach((cell) => (cell.innerText = ""));
  turn = playerX;
  gameOverMessage.innerText = "";
  console.log(boardStatus);
}
