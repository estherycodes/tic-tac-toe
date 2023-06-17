// Create gameboard
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
  return {
    createBoard, getBoard, updateBoard, resetBoard,
  };
};

// get players from form
const getPlayers = () => {
  const player1Name = document.getElementById('p1').value || 'Player 1';
  const player2Name = document.getElementById('p2').value || 'Player 2';
  const isComputer = document.getElementById('computer').checked;

  const player1 = { name: player1Name, symbol: 'X', getSymbol: () => 'X' };
  const player2 = isComputer ? { name: 'Computer', symbol: 'O', getSymbol: () => 'O' } : { name: player2Name, symbol: 'O', getSymbol: () => 'O' };

  const board = gameBoard();

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

// Create display controller - DOM manipulation module - module pattern
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

// Create option to play against computer - factory function pattern
function computerPlayer() {
  const boxes = document.querySelectorAll('.box');
  const game = gameController();

  document.querySelector('#computer').addEventListener('change', function () {
    if (this.checked) {
      document.querySelector('#p2').disabled = true;
      game.player2 = playerFactory('Computer', 'O');
    } else {
      document.querySelector('#p2').enabled = true;
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

// Create option to play against another player - factory function pattern
function twoPlayer() {
  const game = gameController();
  const boxes = document.querySelectorAll('.box');

  document.querySelector('#p2').addEventListener('change', function () {
    if (this.checked) {
      document.querySelector('#computer').disabled = true;
      game.player2 = playerFactory('Player 2', 'O');
    } else {
      document.querySelector('#computer').disabled = false;
      game.player2 = playerFactory('Computer', 'O');
    }
  });
}

twoPlayer();

// Hide the game area until button is clicked to start game
function startGame() {
  const gameArea = document.querySelector('.gameArea');
  const startBtn = document.querySelector('.btn');
  gameArea.style.display = 'none';
  startBtn.addEventListener('click', (event) => {
    event.preventDefault();
    gameArea.style.display = 'block';
  });
}

startGame();

// Create reset button
const resetBtn = document.querySelector('#reset');
resetBtn.addEventListener('click', () => {
  const boxes = document.querySelectorAll('.box');
  boxes.forEach((box) => {
    box.textContent = '';
  });
  gameController().resetBoard();
});

// Create game logic
function gameLogic() {
  const game = gameController();
  const boxes = document.querySelectorAll('.box');
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
    [0, 4, 8], [2, 4, 6], // diagonal
  ];

  function checkWinner() {
    let winner = null;
    winningCombinations.forEach((combination) => {
      if (game.getBoard()[combination[0]] !== ''
				&& game.getBoard()[combination[0]] === game.getBoard()[combination[1]]
				&& game.getBoard()[combination[1]] === game.getBoard()[combination[2]]) {
        winner = game.getBoard()[combination[0]];
      }
    });
    return winner;
  }

  function checkDraw() {
    let draw = true;
    game.getBoard().forEach((box) => {
      if (box === '') {
        draw = false;
      }
    });
    return draw;
  }

  boxes.forEach((box) => {
    box.addEventListener('click', () => {
      if (checkWinner() === game.player1.getSymbol()) {
        alert(`${game.player1.getName()} wins!`);
        game.resetBoard();
        boxes.forEach((box) => {
          box.textContent = '';
        });
      } else if (checkWinner() === game.player2.getSymbol()) {
        alert(`${game.player2.getName()} wins!`);
        game.resetBoard();
        boxes.forEach((box) => {
          box.textContent = '';
        });
      } else if (checkDraw()) {
        alert('Draw!');
        game.resetBoard();
        boxes.forEach((box) => {
          box.textContent = '';
        });
      }
    });
  });
}

gameLogic();

// Once player 1 has made a move, player 2 or computer can make a move and player 1 cannot make another move until player 2 or computer has made a move
function playerTurn() {
  const game = gameController();
  const boxes = document.querySelectorAll('.box');
  boxes.forEach((box) => {
    box.addEventListener('click', () => {
      if (game.getBoard()[box.getAttribute('data-index')] !== '') {
        box.removeEventListener('click', () => {});
      }
    });
  });
}

playerTurn();
