// =================================================================
// Tic Tac Toe with AI, Eileen Soh, May 2022 =======================
// =================================================================

// =================================================================
// Global variables ================================================
// =================================================================

// Board variables
const boardLength = 3;
let square = [];
const squareArray = [];
let gameMode = "human";
let squareArrayInNumbers = [];

// Player variables
let chosenId;
const humanArray = [];
const compArray = [];
let humanArrayInNumbers = [];
let compArrayInNumbers = [];
let comp = "comp";
let human = "human";

// Create DOM elements
const messageBoard = document.createElement("div");
document.body.appendChild(messageBoard);

const grid = document.createElement("div");
grid.setAttribute("class", "grid");
document.body.appendChild(grid);

function createSquares() {
  for (let i = 0; i < boardLength * boardLength; i++) {
    square = document.createElement("div");
    square.setAttribute("class", "square");
    square.setAttribute("id", i);
    squareArray.push(square.id);

    squareArrayInNumbers = squareArray.map((element) => Number(element));
    grid.appendChild(square);
    square.addEventListener("click", (event) => {
      chosenId = event.target.getAttribute("id");
      draw(human);
      whoWins();
      // invoke first minimax
      setTimeout(minimax(comp), 1000);
      draw(comp);
      console.log(findEmptySquaresArray(squareArrayInNumbers));
    });
  }
}

// Winning variables
const winningConditions = [];

// Winning horizontal conditions
for (let j = 0; j < boardLength; j++) {
  const winningRowConditions = [];
  for (let i = 0; i < boardLength; i++) {
    var start = i + j * boardLength;
    winningRowConditions.push(start);
  }
  winningConditions.push(winningRowConditions);
}

// Winning column conditions
for (let j = 0; j < boardLength; j++) {
  const winningColumnConditions = [];
  for (let i = 0; i < boardLength; i++) {
    var start = i * boardLength + j;
    winningColumnConditions.push(start);
  }
  winningConditions.push(winningColumnConditions);
}

// Winning diagonal conditions
const diagWinningColumnConditions = [];
for (let i = 0; i < boardLength; i++) {
  var start = i * boardLength + i;
  diagWinningColumnConditions.push(start);
}
winningConditions.push(diagWinningColumnConditions);

const diag2WinningColumnConditions = [];
for (let i = 1; i <= boardLength; i++) {
  var start = i * boardLength - i;
  diag2WinningColumnConditions.push(start);
}
winningConditions.push(diag2WinningColumnConditions);

// =================================================================
// Helper functions ================================================
// =================================================================

function whoWins() {
  humanArrayInNumbers = humanArray.map((element) => Number(element));
  compArrayInNumbers = compArray.map((element) => Number(element));

  // match to winning conditions
  if (isItWinning(humanArrayInNumbers)) {
    messageBoard.innerHTML = `human wins`;
    console.log(
      `winningConditions${i} ${winningConditions[i]}; human: ${humanArrayInNumbers}`
    );
    freezeClick();
  }

  if (isItWinning(compArrayInNumbers)) {
    messageBoard.innerHTML = `comp wins`;
    console.log(
      `winningConditions${i} ${winningConditions[i]}; comp: ${compArrayInNumbers}`
    );
    freezeClick();
  }

  if (isItATie(humanArrayInNumbers, compArrayInNumbers)) {
    messageBoard.innerHTML = "It's a tie";
    freezeClick();
  }
}

// Generic winning function - works
function isItWinning(array) {
  for (let i = 0; i < winningConditions.length; i += 1) {
    const checker = winningConditions[i].every((element) =>
      array.includes(element)
    );
    // only return if true
    if (checker) {
      return checker;
    }
  }
}

// Generic tie function - works
function isItATie(array1, array2) {
  if (array1.length + array2.length === boardLength * boardLength) {
    return true;
  }
}

function freezeClick() {
  document.addEventListener("click", disableClick, true);
  function disableClick(event) {
    event.stopPropagation();
    event.preventDefault();
  }
}

function draw(gameMode) {
  if (gameMode === human) {
    console.log(`squareSelected ${chosenId}`);
    humanArray.push(chosenId);
    humanArray.sort();
    squareArrayInNumbers[chosenId] = "O";
    const currentSquare = document.getElementById(chosenId);
    currentSquare.innerHTML =
      '<img src="https://raw.githubusercontent.com/eileenssm90/bootcamp-ticTacToe/main/images/Circle.jpg">';
    gameMode = comp;
  } else if (gameMode === comp) {
    chosenId = minimax(comp);
    compArray.push(chosenId);
    compArray.sort();
    squareArrayInNumbers[chosenId] = "X";
    const currentSquare = document.getElementById(chosenId);
    currentSquare.innerHTML =
      '<img src="https://raw.githubusercontent.com/eileenssm90/bootcamp-ticTacToe/main/images/Cross.jpg">';
    gameMode = human;
  }
}

// =================================================================
// Actual game =====================================================
// =================================================================

// function draw() {
//   if (gameMode === "human") {
//     console.log(`squareSelected ${chosenId}`);
//     humanArray.push(chosenId);
//     humanArray.sort();
//     squareArrayInNumbers[chosenId] = "O";
//     const currentSquare = document.getElementById(chosenId);
//     currentSquare.innerHTML =
//       '<img src="https://raw.githubusercontent.com/eileenssm90/bootcamp-ticTacToe/main/images/Circle.jpg">';
//     gameMode = "comp";
//   } else if (gameMode === "comp") {
//     compArray.push(chosenId);
//     compArray.sort();
//     squareArrayInNumbers[chosenId] = "X";
//     const currentSquare = document.getElementById(chosenId);
//     currentSquare.innerHTML =
//       '<img src="https://raw.githubusercontent.com/eileenssm90/bootcamp-ticTacToe/main/images/Cross.jpg">';
//     gameMode = "human";
//   }
// }

// General formula to find all empty squares, two-stage filter using filtered1
function findEmptySquaresArray(array) {
  let filteredArray = [];
  filteredArray = array
    .filter((element) => element !== "O" && element !== "X")
    .map((element) => Number(element));

  // console.log("filteredArray: " + filteredArray);
  return filteredArray;
}

function minimax(currentPlayer) {
  // define variables
  let depth = 0; // where to put this? will it acquire the accumulate value here?
  let backupBoard = [];
  let backupHumanArray = [];
  let backupCompArray = [];
  if (depth === 0) {
    // Map a backup copy of original board and arrays
    backupBoard = [...squareArrayInNumbers];
    backupHumanArray = [...humanArrayInNumbers];
    backupCompArray = [...compArrayInNumbers];
  }

  // Does it match winning conditions
  // checked
  let result = {};
  if (isItWinning(compArrayInNumbers)) {
    return { score: 10 - depth }; // return as an object. function continues running, only exit if/then
  } else if (isItWinning(humanArrayInNumbers)) {
    return { score: depth - 10 };
  } else if (isItATie(humanArrayInNumbers, compArrayInNumbers)) {
    return { score: 0 };
  }
  // if (isItWinning(compArrayInNumbers)) {
  //   return { score: 10 - depth }; // return as an object. function continues running, only exit if/then
  // } else if (isItWinning(humanArrayInNumbers)) {
  //   return { score: depth - 10 };
  // } else if (isItATie(humanArrayInNumbers, compArrayInNumbers)) {
  //   return { score: 0 };
  // }

  // if not, there are still empty squares, find position of empty squares
  // checked

  let totalMoves = [];
  let emptySquareArray = [];
  emptySquareArray = findEmptySquaresArray(squareArrayInNumbers);
  for (let i = 0; i < emptySquareArray.length; i++) {
    let currentMove = {}; // defined inside loop because reset each round
    // let result = {}; // Put as number because outcome of minimax is squareID.
    currentMove.id = emptySquareArray[i];
    depth++;

    // =============================
    // =============================
    // =============================
    // =============================
    // Result is an object. Result score has value. So wht error?
    if (currentPlayer === human) {
      emptySquareArray[i] = "O";
      humanArrayInNumbers.push(emptySquareArray[i]);
      let result = minimax(comp); // will return score here, and continue function
      currentMove.score = result.score;
      console.log("result: " + result);
      console.log("result.score: " + result.score);
      console.log("currentMove: " + currentMove);
      console.log("currentMove.score: " + currentMove.score);
    } else if (currentPlayer === comp) {
      emptySquareArray[i] = "X";
      compArrayInNumbers.push(emptySquareArray[i]);
      result = minimax(human);
      currentMove.score = result.score;
    }

    // Push score and restore board
    // Will it reach here? Exit at 208 or 212 at minimax
    totalMoves.push(currentMove);
    squareArrayInNumbers = [...backupBoard];
    compArrayInNumbers = [...backupCompArray];
    humanArrayInNumbers = [...backupHumanArray];
  }

  let bestSquareMove = "";
  // Find the lowest and highest scores within the flattened array

  // if comp, want highest score
  if (currentPlayer === comp) {
    let lowerLimit = -100;
    for (let i = 0; i < totalMoves.length; i++) {
      if (totalMoves[i].score > lowerLimit) {
        lowerLimit = totalMoves[i].score;
        bestSquareMove = totalMoves[i].id; // I have id, unlike FCC's
        return bestSquareMove;
      }
    }
  } else if (currentPlayer === human) {
    let upperLimit = 100;
    for (let i = 0; i < totalMoves.length; i++) {
      if (totalMoves[i].score < upperLimit) {
        upperLimit = totalMoves[i].score;
        bestSquareMove = totalMoves[i].id; // I have id, unlike FCC's
        return bestSquareMove;
      }
    }
  }
}

createSquares();
