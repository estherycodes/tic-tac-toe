const gameBoard = () => {
  const board = [];
  const createBoard = () => {
    for (let i = 0; i < 9; i++) {
      board.push('');
    }
  };
  const getBoard = () => board;
  const updateBoard = (index, player) => {
    board[index] = player.getSymbol();
  };
  const resetBoard = () => {
    for (let i = 0; i < 9; i++) {
      board[i] = '';
    }
  };
  return { createBoard, getBoard, updateBoard, resetBoard };
};

const playerFactory = (name, symbol) => {
  const getName = () => name;
  const getSymbol = () => symbol;
  return { getName, getSymbol };
};

const gameController = (player1, player2, board) => {
  player1 = playerFactory('Player 1', 'X');
  player2 = playerFactory('Player 2', 'O');
  board = gameBoard();
  const startGame = () => {
    board.createBoard();
  };
  const getBoard = () => board.getBoard();
  const updateBoard = (index, player) => {
    board.updateBoard(index, player);
  };
  const resetBoard = () => {
    board.resetBoard();
  };
  return {
    startGame, getBoard, updateBoard, resetBoard, player1, player2,
  };
};

const displayController = (() => {
  const game = gameController();
  const boxes = document.querySelectorAll('.box');
  const startGame = () => {
    game.startGame();
    boxes.forEach((box, index) => {
      box.addEventListener('click', (e) => {
        index = e.target.getAttribute('data-index');
        game.updateBoard(index, game.player1);
        box.textContent = game.getBoard()[index];
      });
    });
  };
  return { startGame };
})();

displayController.startGame();

function computerPlayer() {
  const boxes = document.querySelectorAll('.box');
  const game = gameController();

  document.querySelector('#computer').addEventListener('change', function() {
    if (this.checked) {
      document.querySelector('#p2').disabled = true;
      game.player2 = playerFactory('Computer', 'O');
      computerMove();
    } else {
      document.querySelector('#p2').disabled = false;
      game.player2 = playerFactory('Player 2', 'O');
    }
  });

  function computerMove() {
    let randomIndex = Math.floor(Math.random() * 9);
    while (game.getBoard()[randomIndex] !== '') {
      randomIndex = Math.floor(Math.random() * 9);
    }
    game.updateBoard(randomIndex, game.player2);
    boxes[randomIndex].textContent = game.getBoard()[randomIndex];
  }
}

computerPlayer();
