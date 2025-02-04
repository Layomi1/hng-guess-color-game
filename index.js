const colors = [
  "#6A472E",
  "#8F7F71",
  "#E6F5F5",
  "#DB3934",
  "#A8CEE1",
  "#779FB7",
];

const status = [
  { id: 1, text: "Correct" },
  { id: 2, text: "Wrong" },
];

const gameInstruction = document.querySelector(
  '[data-testid="gameInstructions"]'
);
let colorOptions = document.querySelectorAll('[data-testid="colorOption"]');

let colorBox = document.querySelector('[data-testid="colorBox"]');

const gameStatus = document.querySelector('[data-testid="gameStatus"]');

const gameButton = document.querySelector('[data-testid="newGameButton"]');
let gameScore = document.querySelector('[data-testid="score"]');

let count = 0;

console.log(gameScore.textContent);
let randomColor = "";
// add eventlistner to gameButton
function resetGame() {
  gameButton.addEventListener("click", () => {
    randomColor = colors[Math.floor(Math.random() * colors.length)];

    gameStatus.textContent = "";
    gameButton.textContent = "New Game";

    colorBox.style.backgroundColor = "transparent";
  });
  gameInstruction.textContent = "Guess the correct Background Color!";
  gameScore.textContent = count;
}

function hexToRgb(hex) {
  const bigint = parseInt(hex.substring(1), 16);
  return `rgb(${(bigint >> 16) & 255}, ${(bigint >> 8) & 255}, ${
    bigint & 255
  })`;
}

function handleGuessedBg(e) {
  const selectedBg = e.currentTarget.style.backgroundColor;
  colorBox.style.backgroundColor = randomColor;
  gameInstruction.textContent = "Playing...";

  if (selectedBg === hexToRgb(randomColor)) {
    gameScore.textContent = count++;
    gameStatus.textContent = "Correct! 🎉";
    gameStatus.classList.add("celebration");
  } else {
    gameScore.textContent = count;
    gameStatus.textContent = "Wrong! ❌ Try again.";
  }
  gameScore.textContent = count;
}

colorOptions.forEach((button, index) => {
  button.style.backgroundColor = colors[index];
  button.addEventListener("click", handleGuessedBg);
});

resetGame();
