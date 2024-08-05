const cells = document.querySelectorAll('[data-cell]');
const board = document.querySelector('.board');
const message = document.getElementById('message');
const resetButton = document.getElementById('resetButton');

let currentPlayer = 'X';
let gameActive = true;

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleClick(event) {
    const cell = event.target;

    if (cell.classList.contains('cell') && !cell.textContent && gameActive) {
        cell.textContent = currentPlayer;
        if (checkWin()) {
            message.textContent = `${currentPlayer} wins!`;
            gameActive = false;
        } else if (isDraw()) {
            message.textContent = 'It\'s a draw!';
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function checkWin() {
    return winConditions.some(condition => {
        const [a, b, c] = condition;
        return cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent;
    });
}

function isDraw() {
    return [...cells].every(cell => cell.textContent);
}

function resetGame() {
    cells.forEach(cell => cell.textContent = '');
    message.textContent = '';
    currentPlayer = 'X';
    gameActive = true;
}

board.addEventListener('click', handleClick);
resetButton.addEventListener('click', resetGame);
