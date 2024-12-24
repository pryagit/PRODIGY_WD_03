
document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const status = document.getElementById("status");
    const resetButton = document.getElementById("reset");
    let currentPlayer = "X";
    let gameState = Array(9).fill(null);
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  
    function handleClick(event) {
      const cell = event.target;
      const index = cell.dataset.index;
  
      if (!gameState[index]) {
        gameState[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add("taken");
  
        if (checkWin()) {
          status.textContent = `Player ${currentPlayer} wins!`;
          cells.forEach(cell => cell.removeEventListener("click", handleClick));
          return;
        }
  
        if (gameState.every(cell => cell !== null)) {
          status.textContent = "It's a draw!";
          return;
        }
  
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        status.textContent = `Player ${currentPlayer}'s turn.`;
      }
    }
  
    function checkWin() {
      return winningCombinations.some(combination =>
        combination.every(index => gameState[index] === currentPlayer)
      );
    }
  
    function resetGame() {
      gameState.fill(null);
      cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("taken");
        cell.addEventListener("click", handleClick);
      });
      currentPlayer = "X";
      status.textContent = "Player X's turn.";
    }
  
    cells.forEach(cell => cell.addEventListener("click", handleClick));
    resetButton.addEventListener("click", resetGame);
  });
  
