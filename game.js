// game.js

let multiplier = 1.00;
let interval;
let cashoutAvailable = false;
let username = "";
let wallet = 1000;

const multiplierDisplay = document.getElementById("multiplier");
const startBtn = document.getElementById("startBtn");
const cashoutBtn = document.getElementById("cashoutBtn");
const resultText = document.getElementById("result");
const betInput = document.getElementById("bet");
const walletDisplay = document.getElementById("wallet");

function login() {
  username = document.getElementById("username").value;
  if (username.trim() !== "") {
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("gameSection").style.display = "block";
    document.getElementById("displayName").innerText = username;
    updateWallet();
  }
}

function updateWallet() {
  walletDisplay.innerText = wallet;
}

function adjustBet(amount) {
  let val = parseInt(betInput.value);
  val = Math.max(1, val + amount);
  betInput.value = val;
}

function setQuickBet(amount) {
  betInput.value = amount;
}

startBtn.addEventListener("click", () => {
  let betAmount = parseInt(betInput.value);
  if (betAmount > wallet) {
    alert("Not enough coins in wallet!");
    return;
  }

  wallet -= betAmount;
  updateWallet();

  multiplier = 1.00;
  multiplierDisplay.innerText = multiplier.toFixed(2) + "x";
  resultText.innerText = "";
  startBtn.disabled = true;
  cashoutBtn.disabled = false;
  cashoutAvailable = true;

  interval = setInterval(() => {
    multiplier += Math.random() * 0.1;
    multiplierDisplay.innerText = multiplier.toFixed(2) + "x";

    if (Math.random() < 0.01 + multiplier * 0.01) {
      endGame(false, betAmount);
    }
  }, 100);
});

cashoutBtn.addEventListener("click", () => {
  if (cashoutAvailable) {
    let betAmount = parseInt(betInput.value);
    let win = betAmount * multiplier;
    wallet += Math.floor(win);
    updateWallet();
    endGame(true, betAmount);
  }
});

function endGame(won, betAmount) {
  clearInterval(interval);
  startBtn.disabled = false;
  cashoutBtn.disabled = true;
  cashoutAvailable = false;

  if (won) {
    resultText.innerText = `You cashed out at ${multiplier.toFixed(2)}x!`;
  } else {
    resultText.innerText = `Plane crashed at ${multiplier.toFixed(2)}x. You lost!`;
  }
}