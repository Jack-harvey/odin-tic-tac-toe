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

const gameBoardSquare = (function () {
  let arrayOfSquares = [];
  for (i = 0; i < 9; i++) {
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

const gameBoard = (function () {
  const gameGrid = [];
})();
