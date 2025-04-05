function createPlayer(name, boardPiece) {
  let turnNumber = 0;
  let score = 0;
  const increaseTurnNumber = () => turnNumber++;
  const getTurnNumber = () => turnNumber;
  const increaseScore = () => score++;
  const getScore = () => score;
  const resetTurnNumber = () => {
    turnNumber = 0;
  };

  return {
    name,
    boardPiece,
    increaseTurnNumber,
    getTurnNumber,
    increaseScore,
    getScore,
    resetTurnNumber,
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

  const renderBoardToPage = () => {
    board.forEach((square) => {
      const squareOnPage = document.querySelector(`[data-number="${square.position.number}"]`);
      if (square.mark === null) {
        squareOnPage.innerHTML = "";
      } else if (square.mark === "X") {
        squareOnPage.innerHTML = '<i class="fa-solid fa-xmark marker"></i>';
      } else {
        squareOnPage.innerHTML = '<i class="fa-solid fa-o marker"></i>';
      }
    });
  };

  const clearBoardOfAllMarks = () => {
    board.forEach((square) => {
      square.mark = null;
    });
    renderBoardToPage();
  };

  const addEventListenerToBoard = () => {
    const gameBoard = document.querySelector(".game-board");
    gameBoard.addEventListener("click", (e) => {
      textController.writeMessage("");
      gameController.startTurn(e.target.closest(".square").dataset.number);
    });
  };

  return {
    setMarker,
    getAllSquaresWithDefinedMark,
    getNumberOfEmptySquares,
    validateSquareIsFree,
    getEmptySquares,
    renderBoardToPage,
    clearBoardOfAllMarks,
    addEventListenerToBoard,
  };
})();

const gameController = (function () {
  let players = [];
  let currentPlayerTurn = players[0];

  const setupGame = (playerName, playerMark, opponentName) => {
    const name = playerName;
    const mark = playerMark;
    players.push(createPlayer(name, mark));
    players.push(createPlayer(opponentName, players[0].boardPiece == "X" ? "O" : "X"));
    currentPlayerTurn = players[0];
    updatePlayersNames(players);
    gameBoard.renderBoardToPage();
  };

  const startTurn = (number) => {
    if (currentPlayerTurn == players[0]) {
      playersChoice = number;
    } else {
      playersChoice = opponentController.opponentsMove();
    }

    if (gameBoard.validateSquareIsFree(playersChoice) === false) {
      textController.writeMessage("That square is already taken", "warning");
      return;
    }

    gameBoard.setMarker(playersChoice, currentPlayerTurn.boardPiece);
    currentPlayerTurn.increaseTurnNumber();
    gameBoard.renderBoardToPage();
    let winResult = evaluateWin(currentPlayerTurn);
    evaluateGameEnd(winResult);
  };

  const evaluateWin = (player) => {
    let winResult = { result: "", player };

    const isItTheLastTurn = gameBoard.getNumberOfEmptySquares() == 0 ? true : false;
    const marker = player.boardPiece;

    if (player.getTurnNumber() < 3) {
      return winResult;
    }

    if (confirmDiagonalMarkedSquares(marker)) {
      winResult.player.increaseScore();
      winResult.result = "win";
    }

    if (confirmStraightMarkedSquares(marker)) {
      winResult.player.increaseScore();
      winResult.result = "win";
    }

    if (isItTheLastTurn) {
      winResult.result = "draw";
    }
    return winResult;
  };

  const evaluateGameEnd = (winResult) => {
    if (winResult.result == "") {
      currentPlayerTurn = currentPlayerTurn === players[0] ? players[1] : players[0];
      if (currentPlayerTurn === players[0]) {
        return;
      }
      startTurn();
    } else {
      announceWinner(winResult);
    }
  };

  const announceWinner = (winResult) => {
    const name = winResult.player.name;
    const result = winResult.result;
    const playerNumber = players.findIndex((player) => player.name === winResult.player.name) + 1;
    const playerScoreSelector = playerNumber === 1 ? ".player-one>.score" : ".player-two>.score";
    const score = winResult.player.getScore();

    const playerScoreDiv = document.querySelector(playerScoreSelector);
    playerScoreDiv.innerHTML = score;
    if (result === "draw") {
      textController.writeMessage(`Both players have come to a draw`);
    }
    textController.writeMessage(`${name} takes the ${result}`);
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

  const startNextGame = (msg = "A new game has started, good luck!") => {
    gameBoard.clearBoardOfAllMarks();
    players.forEach((player) => {
      player.resetTurnNumber();
    });
    textController.writeMessage(msg);
  };

  const createStartNextGameEventListener = () => {
    const resetButton = document.querySelector(".tool-bar>button");

    resetButton.addEventListener("click", () => {
      startNextGame();
    });
  };

  const updatePlayersNames = (players) => {
    playerOneNameEl = document.querySelector(".player-one>.name");
    playerTwoNameEl = document.querySelector(".player-two>.name");

    playerOneNameEl.innerHTML = players[0].name;
    playerTwoNameEl.innerHTML = players[1].name;
  };

  return {
    setupGame,
    evaluateWin,
    startTurn,
    players,
    createStartNextGameEventListener,
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
    return marker.length === 0 ? "X" : marker[0];
  };

  const submit = () => {
    const playerName = document.getElementsByName("playerName")[0].value;
    const opponentName = document.getElementsByName("opponentName")[0].value;
    const playerMark = getMark().toUpperCase();

    return { playerName, playerMark, opponentName };
  };

  const CreateListnerForformSubmit = () => {
    const form = document.querySelector("#newGame");
    form.addEventListener("submit", (e) => {
      const initialValues = formController.submit();
      gameController.setupGame(
        initialValues.playerName === "" ? "Player-1" : initialValues.playerName,
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

const textController = (function () {
  const messageBoxText = document.querySelector(".message>.text");
  const messageBox = document.querySelector(".message");

  const writeMessage = (text, type = "message") => {
    if (text === "") {
      messageBox.style.opacity = "0";
      messageBox.style.transition = "opacity 1s ease";
      return;
    } else {
      messageBox.style.opacity = "1";
      messageBox.style.transition = "opacity 1s ease";
    }
    messageBox.classList.remove("warning");

    messageBox.classList.add(`${type}`);
    messageBoxText.innerHTML = text;
  };

  return {
    writeMessage,
  };
})();

const pageController = (function () {
  return {};
})();

document.addEventListener("DOMContentLoaded", () => {
  gameBoard.addEventListenerToBoard();
  modalController.show();
  modalController.createCloseEvent();
  formController.CreateListnerForformSubmit();
  gameController.createStartNextGameEventListener();
});
