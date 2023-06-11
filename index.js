const gameBoard(board) {
    const board = [];
    const createBoard = () => {
        for (let i = 0; i < 9; i++) {
            board.push('');
        }
    }
    const getBoard = () => board;
    const updateBoard = (index, player) => {
        board[index] = player.getSymbol();
    }
    const resetBoard = () => {
        for (let i = 0; i < 9; i++) {
            board[i] = '';
        }
    }
    return { createBoard, getBoard, updateBoard, resetBoard }
}

const playerFactory(name, symbol) {
    const getName = () => name;
    const getSymbol = () => symbol;
    return { getName, getSymbol }
}

const gameController(player1, player2, board) {
    player1 = playerFactory('Player 1', 'X');
    player2 = playerFactory('Player 2', 'O');
    board = gameBoard();
    const startGame = () => {
        board.createBoard();
    }
    const getBoard = () => board.getBoard();
    const updateBoard = (index, player) => {
        board.updateBoard(index, player);
    }
    const resetBoard = () => {
        board.resetBoard();
    }
    return { startGame, getBoard, updateBoard, resetBoard }
}

const displayController = (() => {
    const game = gameController();
    const board = game.getBoard();
    const boxes = document.querySelectorAll('.box');
    const startGame = () => {
        game.startGame();
        boxes.forEach(box => {
            box.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                game.updateBoard(index, player1.getSymbol());
                displayController.updateBoard();
            })
        })
    }
    const updateBoard = () => {
        board = game.getBoard();
        boxes.forEach((box, index) => {
            box.textContent = board[index];
        })
    }
    return { startGame, updateBoard }
})();
displayController.startGame();
```

## 3.2.2. Tic Tac Toe - DOM Manipulation

