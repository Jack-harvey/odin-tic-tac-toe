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
    return board.filter((square) => square.mark == mark);
  };

  const getEmptySquares = () => {
    let allFreeSquares = board.filter((square) => square.mark == null);
    return allFreeSquares;
  };

  const getNumberOfEmptySquares = () => {
    let allFreeSquares = board.filter((square) => square.mark == null);
    return allFreeSquares.length;
  };

  const printBoardToConsole = () => {
    const map = board.map((square) =>
      square.mark === null ? (square.consoleMark = "□") : (square.consoleMark = square.mark)
    );
    console.log("-----------------------------------------");
    console.log(`${map[0]}${map[1]}${map[2]}`);
    console.log(`${map[3]}${map[4]}${map[5]}`);
    console.log(`${map[6]}${map[7]}${map[8]}`);
    console.log("-----------------------------------------");
  };

  const renderBoardToPage = () => {
    //define color, and mark, and square
    board.forEach((square) => {
      if (square.mark === null) {
        return;
      }
      var squareOnPage = document.querySelector(`[data-number="${square.position.number}"]`);
      if (square.mark === "X") {
        squareOnPage.innerHTML = '<i class="fa-solid fa-xmark marker"></i>';
      }
      if (square.mark === "O") {
        squareOnPage.innerHTML = '<i class="fa-solid fa-o marker"></i>';
      }
    });
  };

  //set a square to a marker, color appropiratly

  //if you click on an already marked square then display an error

  const test = () => {
    return board;
  };

  return {
    setMarker,
    getAllSquaresWithDefinedMark,
    getNumberOfEmptySquares,
    validateSquareIsFree,
    getEmptySquares,
    test,
    printBoardToConsole,
    renderBoardToPage,
  };
})();

const gameController = (function () {
  let players = [];
  let currentPlayerTurn = players[0];

  const setupGame = (playerName, playerMark, opponentName = "Player-2") => {
    const name = playerName;
    const mark = playerMark;
    players.push(createPlayer(name, mark));
    players.push(createPlayer(opponentName, players[0].boardPiece == "X" ? "O" : "X"));
    currentPlayerTurn = players[0];
    gameBoard.renderBoardToPage();
  };

  // start turn (player, number) do the stuff;
  //jump in here, decide if it's players turn, because if it is we need to wait for a click. if not it's oppo
  const startTurn = (number) => {
    if (currentPlayerTurn == players[0]) {
      playersChoice = number;
    } else {
      playersChoice = opponentController.opponentsMove();
    }

    if (!gameBoard.validateSquareIsFree(playersChoice)) {
      console.log("That square is already taken");
    }

    gameBoard.setMarker(playersChoice, currentPlayerTurn.boardPiece);
    currentPlayerTurn.increaseTurnNumber();
    gameBoard.renderBoardToPage();
    let winResult = evaluateWin(currentPlayerTurn);
    evaluateGameEnd(winResult);
  };

  const evaluateWin = (player) => {
    let winResult = { result: "", player };

    const isItTheLastTurn = gameBoard.getNumberOfEmptySquares == 0 ? true : false;
    const marker = player.boardPiece;

    if (player.getTurnNumber() < 3) {
      return winResult;
    }

    if (confirmDiagonalMarkedSquares(marker)) {
      winResult.result = "win";
    }

    if (confirmStraightMarkedSquares(marker)) {
      winResult.result = "win";
    }

    if (isItTheLastTurn) {
      winResult.result = "draw";
    } else {
      return winResult;
    }
  };

  const evaluateGameEnd = (winResult) => {
    if (winResult.result == "") {
      currentPlayerTurn = currentPlayerTurn === players[0] ? players[1] : players[0];
      if (currentPlayerTurn === players[0]) {
        return;
      }
      startTurn();
    } else {
      alert(`${winResult.player.name} ${winResult.result}`);
    }
  };

  const confirmStraightMarkedSquares = (mark) => {
    const NUMEROFMARKSINAROW = 3;
    const getAllSquaresWithDefinedMark = gameBoard.getAllSquaresWithDefinedMark(mark);

    for (let index = 1; index < 4; index++) {
      let numberOfMarksInRow = getAllSquaresWithDefinedMark.filter(
        (square) => square.position.row == index
      );
      let numberOfMarksInCol = getAllSquaresWithDefinedMark.filter(
        (square) => square.position.col == index
      );

      if (
        numberOfMarksInCol.length == NUMEROFMARKSINAROW ||
        numberOfMarksInRow.length == NUMEROFMARKSINAROW
      ) {
        return true;
      }
    }
    return false;
  };

  const confirmDiagonalMarkedSquares = (mark) => {
    const getAllSquaresWithDefinedMark = gameBoard.getAllSquaresWithDefinedMark(mark);

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

  return {
    setupGame,
    evaluateWin,
    startTurn,
    players,
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

const modalController = (function () {
  const newGameModal = document.querySelector("#createPlayer");

  const createCloseEvent = () => {
    document.querySelector(".close-modal").addEventListener("click", (e) => {
      newGameModal.close();
      newGameModal.reset();
    });
  };

  const show = () => {
    newGameModal.showModal();
  };

  return {
    createCloseEvent,
    show,
  };
})();

const formController = (function () {
  const getMark = () => {
    let marker = [];
    document.querySelectorAll('[type="checkbox"]').forEach((mark) => {
      if (mark.checked === true) {
        marker.push(mark.value);
      }
    });
    return marker[0];
  };

  const submit = () => {
    let playerName = document.getElementsByName("playerName")[0].value;
    let opponentName = document.getElementsByName("opponentName")[0].value;
    const playerMark = getMark().toUpperCase();

    return { playerName, playerMark, opponentName };
  };

  const CreateListnerForformSubmit = () => {
    const form = document.querySelector("#newGame");
    form.addEventListener("submit", (e) => {
      const initialValues = formController.submit();
      gameController.setupGame(
        initialValues.playerName,
        initialValues.playerMark,
        initialValues.opponentName === "" ? "Player-2" : initialValues.opponentName
      );
    });
  };

  return {
    submit,
    CreateListnerForformSubmit,
  };
})();

const pageController = (function () {
  return {};
})();

modalController.show();
modalController.createCloseEvent();
formController.CreateListnerForformSubmit();

document.addEventListener("DOMContentLoaded", () => {
  const gameBoard = document.querySelector(".game-board");
  gameBoard.addEventListener("click", (e) => {
    gameController.startTurn(e.target.closest(".square").dataset.number);
  });
});

function gameTest() {
  gameController.setupGame();
  gameController.startTurn();
}
//gameTest();
