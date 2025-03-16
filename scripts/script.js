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
  let arrayOfSquares = [];
  for (let i = 0; i < 9; i++) {
    switch (i) {
      case 0:
        arrayOfSquares.push({
          position: { number: 0, row: 1, col: 1 },
          mark: null,
        });
        break;
      case 1:
        arrayOfSquares.push({
          position: { number: 1, row: 1, col: 2 },
          mark: null,
        });
        break;
      case 2:
        arrayOfSquares.push({
          position: { number: 2, row: 1, col: 3 },
          mark: null,
        });
        break;
      case 3:
        arrayOfSquares.push({
          position: { number: 3, row: 2, col: 1 },
          mark: null,
        });
        break;
      case 4:
        arrayOfSquares.push({
          position: { number: 4, row: 2, col: 2 },
          mark: null,
        });
        break;
      case 5:
        arrayOfSquares.push({
          position: { number: 5, row: 2, col: 3 },
          mark: null,
        });
        break;
      case 6:
        arrayOfSquares.push({
          position: { number: 6, row: 3, col: 1 },
          mark: null,
        });
        break;
      case 7:
        arrayOfSquares.push({
          position: { number: 7, row: 3, col: 2 },
          mark: null,
        });
        break;
      case 8:
        arrayOfSquares.push({
          position: { number: 8, row: 3, col: 3 },
          mark: null,
        });
        break;
    }
  }
  return arrayOfSquares;
})();

const gameLogic = (function () {
  const isPlayersTurn = false;
  const swapPlayersTurn = () => (isPlayersTurn = !isPlayersTurn);
})();

const evaluateWin = (function () {
  const NUMBEROFSQUARESTOWIN = 3;

  const evaluateWin = function (player, mark, gameBoard) {
    const isItTheLastTurn =
      gameBoard.findIndex((square) => square.mark == null) === -1
        ? true
        : false;

    const playersMarkedSquares = gameBoard.filter(
      (square) => square.mark == mark
    );

    if (
      playersMarkedSquares.findIndex(
        (square) => square.position.row == 2 && square.position.col == 2
      )
    ) {
      const column1 = gameBoard.filer(
        (square) =>
          (square.position.col == 1 && square.row == 1) || square.row == 3
      );
      const column3 = gameBoard.filer(
        (square) =>
          (square.position.col == 3 && square.row == 1) || square.row == 3
      );

      if (column1.length == 2 || column3.length == 2) {
        return player
      }
    }

    for (let index = 1; index < 4; index++) {
      let numberOfMarksInRow = gameBoard.filter(
        (square) => square.position.row == index
      );
      let numberOfMarksInCol = gameBoard.filter(
        (square) => square.position.col == index
      );

      if (
        numberOfMarksInCol == NUMBEROFSQUARESTOWIN ||
        numberOfMarksInRow == NUMBEROFSQUARESTOWIN
      ) {
        return player
      }
    }

    return isItTheLastTurn ? 'draw' : 'noWinYet'
  };


return evaluateWin();

}




})();
