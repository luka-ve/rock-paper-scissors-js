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
  document.getElementById("player-score").innerHTML = playerScore;
  document.getElementById("ai-score").innerHTML = aiScore;

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

buttons.rock.onclick = () => ply("rock");
buttons.paper.onclick = () => ply("paper");
buttons.scissors.onclick = () => ply("scissors");
buttons.reset.onclick = () => setup();

function setup() {
  playerScore = 0;
  aiScore = 0;
  nRounds = 0;

  updateUI();
  const scoreContainer = document.querySelector("div.score-container");
  scoreContainer.removeChild(document.getElementById("winner"));
  gameRunning = true;
  updateUI();
}

setup();
