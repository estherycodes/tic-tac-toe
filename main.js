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

function playerOne(name, symbol) {
    name = document.getElementById('p1').value || 'Player 1',
    symbol = 'X',
};

function playerTwo(name, symbol) {
    name = document.getElementById('p2').value || 'Player 2',
    symbol = 'O',
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
        const player1 = new playerOne(playerOne.name, playerOne.symbol);
        const player2 = isComputer ? new playerTwo('Computer', 'O') : new playerTwo(playerTwo.name, playerTwo.symbol);

        const gameArea = document.getElementsByClassName('gameArea')[0];
        const playerDeclaration = document.createElement('h1');
        gameArea.insertBefore(playerDeclaration, gameArea.childNodes[0]);
        playerDeclaration.textContent = `${player1.name} vs ${player2.name}`;

        startGame(player1, player2);
    });
}

getPlayers();

function startGame() {