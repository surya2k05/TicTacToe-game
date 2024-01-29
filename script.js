let player1 = '';
let player2 = '';
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function startGame() {
  player1 = document.getElementById('player1').value || 'Player 1';
  player2 = document.getElementById('player2').value || 'Player 2';

  document.getElementById('players').style.display = 'none';
  document.getElementById('status').innerText = `${player1}'s turn`;
}

function handleClick(index) {
  if (board[index] === '' && gameActive) {
    board[index] = currentPlayer;
    document.getElementById('board').children[index].innerText = currentPlayer;

    if (checkWin()) {
      showPopup(`${currentPlayer === 'X' ? player1 : player2} wins!`);
      gameActive = false;
    } else if (board.every(cell => cell !== '')) {
      showPopup('It\'s a tie!');
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      document.getElementById('status').innerText = `${currentPlayer === 'X' ? player1 : player2}'s turn`;
    }
  }
}

function checkWin() {
  return winningCombinations.some(combination => {
    const [a, b, c] = combination;
    return board[a] !== '' && board[a] === board[b] && board[b] === board[c];
  });
}

function resetGame() {
  player1 = '';
  player2 = '';
  currentPlayer = 'X';
  board = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  document.getElementById('players').style.display = 'block';
  document.getElementById('player1').value = '';
  document.getElementById('player2').value = '';
  document.getElementById('status').innerText = '';

  const cells = document.getElementById('board').children;
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerText = '';
  }

  hidePopup();
}

function showPopup(message) {
  const popup = document.getElementById('popup');
  const popupMessage = document.getElementById('popup-message');
  const resetButton = document.getElementById('reset-button');

  popupMessage.innerHTML = message;
  popup.style.display = 'block';

  resetButton.addEventListener('click', function () {
    hidePopup();
    resetGame();
  });
}

function hidePopup() {
  const popup = document.getElementById('popup');
  popup.style.display = 'none';
}
