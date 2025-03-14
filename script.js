let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let isGameOver = false;

const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

function checkWinner() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return gameBoard[a]; // Return the winner (either 'X' or 'O')
        }
    }

    if (!gameBoard.includes("")) {
        return "Draw"; // If no winner and board is full, it's a draw
    }

    return null; // No winner yet
}

function handleCellClick(index) {
    if (gameBoard[index] || isGameOver) return; // Cell already filled or game over

    gameBoard[index] = currentPlayer;
    cells[index].textContent = currentPlayer;
    cells[index].classList.add(currentPlayer.toLowerCase());

    const winner = checkWinner();

    if (winner) {
        isGameOver = true;
        if (winner === "Draw") {
            statusText.textContent = "Remis!";
        } else {
            statusText.textContent = `Gracz ${winner} wygrywa!`;
        }
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.textContent = `Kolej Gracza ${currentPlayer}'`;
    }
}

function resetGame() {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    isGameOver = false;
    currentPlayer = "X";
    statusText.textContent = "Kolej Gracza X";

    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("x", "o");
    });
}

// Add event listeners to each cell
cells.forEach(cell => {
    cell.addEventListener("click", () => handleCellClick(cell.dataset.index));
});
