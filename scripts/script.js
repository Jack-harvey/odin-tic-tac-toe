function createPlayer(name, boardPiece) {
  let turnNumber = 0;
  let score = 0;
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

  const validateSquareIsFree = (squareNumberChosen) => {
    const allFreeSquares = board.filter((square) => square.mark == null);
    const findSquare = allFreeSquares.findIndex((sq) => sq.position.number == squareNumberChosen);
    return findSquare == -1 ? false : true;
  };

  const setMarker = (gridNumber, mark) => {
    board.find((square) => square.position.number == gridNumber).mark = mark;
  };

  const getAllSquaresWithDefinedMark = (mark) => {
    board.filter((square) => square.mark == mark);
  };

  const getEmptySquares = () => {
    let allFreeSquares = board.filter((square) => square.mark == null);
    return allFreeSquares;
  };

  const getNumberOfEmptySquares = () => {
    let allFreeSquares = board.filter((square) => square.mark == null);
    return allFreeSquares.length;
  };

  const confirmDiagonalMarkedSquares = (mark) => {
    const getAllSquaresWithDefinedMark = board.filter((square) => square.mark == mark);

    if (
      getAllSquaresWithDefinedMark.findIndex(
        (square) => square.position.row == 2 && square.position.col == 2
      ) != -1
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

  const confirmStraightMarkedSquares = (mark) => {
    const NUMBEROFSQUARESTOWIN = 3;
    const getAllSquaresWithDefinedMark = board.filter((square) => square.mark == mark);

    for (let index = 1; index < 4; index++) {
      let numberOfMarksInRow = getAllSquaresWithDefinedMark.filter(
        (square) => square.position.row == index
      );
      let numberOfMarksInCol = getAllSquaresWithDefinedMark.filter(
        (square) => square.position.col == index
      );

      if (
        numberOfMarksInCol.length == NUMBEROFSQUARESTOWIN ||
        numberOfMarksInRow.length == NUMBEROFSQUARESTOWIN
      ) {
        return true;
      }
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
    confirmStraightMarkedSquares,
    validateSquareIsFree,
    getEmptySquares,
  };
})();

const gameController = (function () {
  let players = [];
  let currentPlayerTurn = players[0];

  const setupGame = () => {
    const name = prompt("Pick a name");
    const mark = prompt("Pick a token of X or O");
    players.push(createPlayer(name, mark));
    players[0].increaseTurnNumber();
    players[0].increaseTurnNumber();
    players[0].increaseTurnNumber();
    players.push(createPlayer("Player-2", players[0].boardPiece == "X" ? "O" : "X"));
    currentPlayerTurn = players[0];
  };

  const startTurn = (promptMessage = "Choose a sq from 0-8") => {
    if (currentPlayerTurn == players[0]) {
      playersChoice = prompt(promptMessage);
    } else {
      playersChoice = opponentController.opponentsMove();
    }

    if (!gameBoard.validateSquareIsFree(playersChoice)) {
      startTurn("That square is already taken");
    }

    gameBoard.setMarker(playersChoice, currentPlayerTurn.boardPiece);
    let winResult = evaluateWin(currentPlayerTurn);
    evaluateGameEnd(winResult);
  };

  // const startPlayersTurn = (promptMessage = "Choose a sq from 0-8") => {
  //   currentPlayerTurn = players[0];
  //   playerOnesChoice = prompt(promptMessage);

  //   if (!gameBoard.validateSquareIsFree(playerOnesChoice)) {
  //     startPlayersTurn("That square is already taken");
  //   }

  //   gameBoard.setMarker(playerOnesChoice, players[0].boardPiece);
  //   let winResult = evaluateWin(players[0]);
  //   evaluateGameEnd(winResult);
  // };

  // const startOpponentsTurn = () => {
  //   currentPlayerTurn = players[1];
  //   playerTwosChoice = opponentController.opponentsMove();
  //   if (!gameBoard.validateSquareIsFree(playerTwosChoice)) {
  //     startPlayersTurn("That square is already taken");
  //   }
  //   gameBoard.setMarker(playerTwosChoice, players[1].boardPiece);
  //   let winResult = evaluateWin(players[1]);
  //   evaluateGameEnd(winResult);
  // };

  const evaluateWin = (player) => {
    const isItTheLastTurn = gameBoard.getNumberOfEmptySquares == 0 ? true : false;
    const marker = player.boardPiece;

    if (player.getTurnNumber() < 3) {
      return "";
    }

    if (gameBoard.confirmDiagonalMarkedSquares(marker)) {
      return "win";
    }

    if (gameBoard.confirmStraightMarkedSquares(marker)) {
      return "win";
    }

    if (isItTheLastTurn) {
      return "draw";
    } else {
      return "";
    }
  };

  const evaluateGameEnd = (winResult) => {
    if (winResult == "") {
      currentPlayerTurn = currentPlayerTurn === players[0] ? players[1] : players[0];
      startTurn();
    } else {
      alert(`${winResult}`);
    }
  };

  return {
    evaluateWin,
    setupGame,
    players,
    startTurn,
  };
})();

const opponentController = (function () {
  const opponentsMove = () => {
    emptySquares = gameBoard.getEmptySquares();
    emptySquaresCount = gameBoard.getEmptySquares().length;
    if (emptySquaresCount == 1) {
      return emptySquares[0].position.number;
    } else {
      let randomNumber = Math.floor(Math.random() * (emptySquaresCount - 1 + 1) + 0);
      let squareNumber = emptySquares[randomNumber].position.number;
      return squareNumber;
    }
  };

  return {
    opponentsMove,
  };
})();

function gameTest() {
  gameController.setupGame();
  gameController.startTurn();
}

gameTest();
