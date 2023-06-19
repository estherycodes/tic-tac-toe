// Create gameboard
const gameBoard = () => {
  const board = [];
  const createBoard = () => {
    for (let i = 0; i < 9; i += 1) {
      board.push('');
    }
  };
  const getBoard = () => board;
  const updateBoard = (index, player) => {
    board[index] = player.getSymbol();
  };
  const resetBoard = () => {
    for (let i = 0; i < 9; i += 1) {
      board[i] = '';
    }
  };
  return {
    createBoard, getBoard, updateBoard, resetBoard,
  };
};
gameBoard();

function PlayerOne(name, symbol) {
  name = document.getElementById('p1').value || 'Player 1',
  symbol = 'X',
  this.name = name;
  this.symbol = symbol;
};

function PlayerTwo(name, symbol) {
  name = document.getElementById('p2').value || 'Player 2',
  symbol = 'O',
  this.name = name;
  this.symbol = symbol;
};

// get players from form
function getPlayers() {
  const submitBtn = document.querySelector('#submit');
  let isComputer = false;

  document.querySelector('#computer').addEventListener('change', function () {
    if (this.checked) {
      document.querySelector('#p2').disabled = true;
      isComputer = true;
    } else {
      document.querySelector('#p2').enabled = true;
      isComputer = false;
    }
  });

  submitBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const player1 = new PlayerOne();
    const player2 = isComputer ? new PlayerTwo('Computer', 'O') : new PlayerTwo();

    const gameArea = document.getElementsByClassName('gameArea')[0];
    const playerDeclaration = document.createElement('h1');
    gameArea.insertBefore(playerDeclaration, gameArea.childNodes[0]);
    playerDeclaration.textContent = `${player1.name} vs ${player2.name}`;

    startGame(player1, player2);
  });
}

getPlayers();

function startGame(player1, player2) {
  const board = gameBoard();
  board.createBoard();
  const getBoard = () => board.getBoard();

  const updateBoard = (index, player) => board.updateBoard(index, player);
  const resetBoard = () => board.resetBoard();

  const gameArea = document.getElementsByClassName('gameArea');
  const boxes = document.querySelectorAll('.box');
  const playerRound = document.createElement('p');

  gameArea.insertBefore(playerRound, gameArea.childNodes[1]);
  playerRound.textContent = `${player1.name}'s turn`;

  boxes.forEach((box) => {
    box.addEventListener('click', (event) => {
      const index = event.target.getAttribute('data-index');
      updateBoard(index, player1);
      box.textContent = player1.symbol;
      playerRound.textContent = `${player2.name}'s turn`;
    });
  });
}

function checkWinner() {
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
    [0, 4, 8], [2, 4, 6], // diagonal
  ];
  const board = gameBoard();
  const getBoard = () => board.getBoard();
  const boardArray = getBoard();
  const winner = winningCombos.some((combo) => {
    const [a, b, c] = combo;
    return boardArray[a] && boardArray[a] === boardArray[b] && boardArray[a] === boardArray[c];
  });
  return winner;
}

function checkTie() {
  const board = gameBoard();
  const getBoard = () => board.getBoard();
  const boardArray = getBoard();
  const tie = boardArray.every((box) => box !== '');
  return tie;
}

function endGame() {
  const board = gameBoard();
  const resetBoard = () => board.resetBoard();
  const boxes = document.querySelectorAll('.box');
  const playerRound = document.querySelector('p');
  const winner = checkWinner();
  const tie = checkTie();
  resetBoard();
  if (winner) {
    playerRound.textContent = `${player1.name} wins!`;
    boxes.forEach((box) => {
      box.removeEventListener('click', startGame);
    });
  } else if (tie) {
    playerRound.textContent = 'It\'s a tie!';
    boxes.forEach((box) => {
      box.removeEventListener('click', startGame);
    });
  }
}

function resetGame() {
  const board = gameBoard();
  const resetBoard = () => board.resetBoard();
  const boxes = document.querySelectorAll('.box');
  const playerRound = document.querySelector('p');
  resetBoard();
  playerRound.textContent = `${player1.name}'s turn`;
  boxes.forEach((box) => {
    box.textContent = '';
  });
}

const resetBtn = document.querySelector('#reset');
resetBtn.addEventListener('click', resetGame);
