let playerScore;
let aiScore;
let nRounds;
let gameRunning = true;

const MAXROUNDS = 5;

function makeAiChoiceDumb() {
  const choices = ["rock", "paper", "scissors"];
  const i = Math.floor(Math.random() * choices.length);
  return choices[i];
}

function ply(playerChoice) {
  if (!gameRunning) {
    return;
  }

  const aiChoice = makeAiChoiceDumb();

  console.log("Your choice: " + playerChoice + ". AI Choice: " + aiChoice);

  scorePly(playerChoice, aiChoice);
  updateUI();
  nRounds++;

  checkForEndOfGame();
}

function updateUI() {
  document.getElementById("player-score").textContent = playerScore;
  document.getElementById("ai-score").textContent = aiScore;

  if (!gameRunning) {
    const winner = document.createElement("p");
    winner.id = "winner";

    if (playerScore > aiScore) {
      winner.textContent = "You won";
    } else if (aiScore > playerScore) {
      winner.textContent = "AI won";
    }

    winner.setAttribute(
      "style",
      "color: blue; font-size: 30px; text-align: center;"
    );

    const scoreContainer = document.querySelector("div.score-container");
    scoreContainer.appendChild(winner);
  }
}

function scorePly(player, ai) {
  const winningTable = {
    rock: "scissors",
    scissors: "paper",
    paper: "rock",
  };

  if (player == ai) {
    console.log("Tie!");
    return;
  }

  if (winningTable[player] == ai) {
    playerScore++;
  } else {
    aiScore++;
  }
}

function checkForEndOfGame() {
  if (playerScore == 3 || aiScore == 3) {
    gameRunning = false;

    updateUI();
  }
}

buttons = {
  rock: document.querySelector("#rock"),
  paper: document.querySelector("#paper"),
  scissors: document.querySelector("#scissors"),
  reset: document.querySelector(".reset-btn"),
};

buttons.rock.addEventListener("click", () => ply("rock"));
buttons.paper.addEventListener("click", () => ply("paper"));
buttons.scissors.addEventListener("click", () => ply("scissors"));
buttons.reset.addEventListener("click", () => setup());

function setup() {
  playerScore = 0;
  aiScore = 0;
  nRounds = 0;

  const scoreContainer = document.querySelector("div.score-container");
  const winnerP = document.getElementById("winner");
  if (winnerP) {
    scoreContainer.removeChild(winnerP);
  }

  gameRunning = true;

  updateUI();
}

setup();
