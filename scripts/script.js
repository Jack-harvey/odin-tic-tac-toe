function createPlayer(name, boardPiece) {
  const turnNumber = 0;
  const score = 0;
  const increaseTurnNumber = () => turnNumber++;
  const getTurnNumber = () => turnNumber;
  const increaseScore = () => score++;
  const getScore = () => score;

  return {
    name,
    boardPiece,
    increaseTurnNumber,
    getTurnNumber,
    increaseScore,
    getScore,
  };
}

const gameBoard = (function () {
  let board = [];

  for (let i = 0; i < 9; i++) {
    switch (i) {
      case 0:
        board.push({
          position: { number: 0, row: 1, col: 1 },
          mark: null,
        });
        break;
      case 1:
        board.push({
          position: { number: 1, row: 1, col: 2 },
          mark: null,
        });
        break;
      case 2:
        board.push({
          position: { number: 2, row: 1, col: 3 },
          mark: null,
        });
        break;
      case 3:
        board.push({
          position: { number: 3, row: 2, col: 1 },
          mark: null,
        });
        break;
      case 4:
        board.push({
          position: { number: 4, row: 2, col: 2 },
          mark: null,
        });
        break;
      case 5:
        board.push({
          position: { number: 5, row: 2, col: 3 },
          mark: null,
        });
        break;
      case 6:
        board.push({
          position: { number: 6, row: 3, col: 1 },
          mark: null,
        });
        break;
      case 7:
        board.push({
          position: { number: 7, row: 3, col: 2 },
          mark: null,
        });
        break;
      case 8:
        board.push({
          position: { number: 8, row: 3, col: 3 },
          mark: null,
        });
        break;
    }
  }

  const setMarker = (gridNumber, mark) => {
    board.find((square) => square.position.number == gridNumber).mark = mark;
  };

  const getAllSquaresWithDefinedMark = (mark) => {
    board.filter((square) => square.mark == mark);
  };

  const getNumberOfEmptySquares = () => {
    let x = board.filter((square) => square.mark == null);
    return x.length;
  };

  const confirmDiagonalMarkedSquares = (mark) => {
    const getAllSquaresWithDefinedMark = board.filter((square) => square.mark == mark);

    if (
      getAllSquaresWithDefinedMark.findIndex(
        (square) => square.position.row == 2 && square.position.col == 2
      )
    ) {
      const number0Marked = getAllSquaresWithDefinedMark.findIndex(
        (square) => square.position.number == 0
      );
      const number6Marked = getAllSquaresWithDefinedMark.findIndex(
        (square) => square.position.number == 6
      );
      const number2Marked = getAllSquaresWithDefinedMark.findIndex(
        (square) => square.position.number == 2
      );
      const number8Marked = getAllSquaresWithDefinedMark.findIndex(
        (square) => square.position.number == 8
      );

      const winConditionOne = number0Marked != -1 && number8Marked != -1 ? true : false;
      const winConditionTwo = number2Marked != -1 && number6Marked != -1 ? true : false;

      return winConditionOne || winConditionTwo ? true : false;
    }
    return false;
  };

  const test = () => {
    return board;
  };

  const testWinConD1 = () => {
    board.find((square) => square.position.number == 0).mark = "x";
    board.find((square) => square.position.number == 4).mark = "x";
    board.find((square) => square.position.number == 8).mark = "x";
  };

  const testWinConD2 = () => {
    board.find((square) => square.position.number == 0).mark = "x";
    board.find((square) => square.position.number == 4).mark = "x";
    board.find((square) => square.position.number == 8).mark = "x";
  };

  const testWinConC1 = () => {
    board.find((square) => square.position.number == 0).mark = "x";
    board.find((square) => square.position.number == 3).mark = "x";
    board.find((square) => square.position.number == 6).mark = "x";
  };
  const testWinConR1 = () => {
    board.find((square) => square.position.number == 0).mark = "x";
    board.find((square) => square.position.number == 1).mark = "x";
    board.find((square) => square.position.number == 2).mark = "x";
  };

  return {
    setMarker,
    getAllSquaresWithDefinedMark,
    getNumberOfEmptySquares,
    test,
    testWinConD1,
    testWinConD2,
    testWinConC1,
    testWinConR1,
    confirmDiagonalMarkedSquares,
  };
})();

const evaluateWin = (function () {
  const NUMBEROFSQUARESTOWIN = 3;

  const evaluateWin = function (player, mark) {
    const isItTheLastTurn = gameBoard.getNumberOfEmptySquares == 0 ? true : false;

    const playersMarkedSquares = gameBoard.getAllSquaresWithDefinedMark(mark);

    if (
      playersMarkedSquares.findIndex(
        (square) => square.position.row == 2 && square.position.col == 2
      )
    ) {
      const column1 = gameBoard.filer(
        (square) => (square.position.col == 1 && square.row == 1) || square.row == 3
      );
      const column3 = gameBoard.filer(
        (square) => (square.position.col == 3 && square.row == 1) || square.row == 3
      );

      if (column1.length == 2 || column3.length == 2) {
        return player;
      }
    }

    for (let index = 1; index < 4; index++) {
      let numberOfMarksInRow = gameBoard.filter((square) => square.position.row == index);
      let numberOfMarksInCol = gameBoard.filter((square) => square.position.col == index);

      if (
        numberOfMarksInCol == NUMBEROFSQUARESTOWIN ||
        numberOfMarksInRow == NUMBEROFSQUARESTOWIN
      ) {
        return player;
      }
    }

    return isItTheLastTurn ? "draw" : "noWinYet";
  };

  return evaluateWin;
})();

const opponentsMove = (function () {
  function pickASquare(gameBoard) {
    const availableSquaresToPick = gameBoard.filter((square) => square.mark == null);
    const maxSquares = availableSquaresToPick.length;
    if (maxSquares == 1) {
      return availableSquaresToPick;
    }
    const squareNumberPick = Math.floor(Math.random() * (maxSquares - 0 + 1) + 0);
    return availableSquaresToPick.find((square) => square.position.number == squareNumberPick);
  }

  return { pickASquare };
})();

function gameTest() {
  // let playersGName = "Jack";
  // let playersGMark = "X";
  // let opponentsGMark = playersGMark == "O" ? "X" : "O";
  // player1 = createPlayer(playersGName, playersGMark);
  // player2 = createPlayer("player2", opponentsGMark);
  // myGameBoard = gameBoard.create();
  // let playersGChoice = Number(prompt("pick sq 0-8"));
  // myGameBoard.find((square) => square.position.number == playersGChoice).mark =
  //   playersGMark;
  // let oppoTurn = opponentsMove;
  // let opponentsGChoice = oppoTurn.pickASquare(myGameBoard);
  // console.log(opponentsGChoice);
  // myGameBoard.find((square) => square.position.number == playersGChoice).mark =
  //   playersGMark;
}

gameTest();
