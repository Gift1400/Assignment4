const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreEl = document.getElementById("score");
const statusEl = document.getElementById("status");
const actionBtn = document.getElementById("actionBtn");

const groundY = 240;

const player = {
  x: 80,
  y: groundY - 50,
  width: 40,
  height: 50,
  velocityY: 0,
  gravity: 0.9,
  jumpStrength: -16,
  grounded: true
};

let obstacles = [];
let frame = 0;
let score = 0;
let gameOver = false;
let obstacleTimer = 0;
let obstacleInterval = 90;
let speed = 6;
let gameStarted = false;

function resetGame() {
  player.y = groundY - player.height;
  player.velocityY = 0;
  player.grounded = true;
  obstacles = [];
  frame = 0;
  score = 0;
  gameOver = false;
  obstacleTimer = 0;
  obstacleInterval = 90;
  speed = 6;

  scoreEl.textContent = "Score: 0";
  statusEl.textContent = "Stato: In gioco";
  requestAnimationFrame(gameLoop);
}

function jump() {
  if (player.grounded && !gameOver) {
    player.velocityY = player.jumpStrength;
    player.grounded = false;
  }
}

function handleInput(e) {
  if (e.code === "Space" || e.code === "ArrowUp") {
    e.preventDefault();
    jump();
  }

  if (gameOver && e.code === "Enter") {
    resetGame();
  }
}

function applyGravity() {
  player.velocityY += player.gravity;
  player.y += player.velocityY;

  if (player.y >= groundY - player.height) {
    player.y = groundY - player.height;
    player.velocityY = 0;
    player.grounded = true;
  }
}

function generateObstacle() {
  const height = 35 + Math.random() * 30;
  const width = 20 + Math.random() * 15;

  obstacles.push({
    x: canvas.width + 10,
    y: groundY - height,
    width,
    height
  });
}

function updateObstacles() {
  obstacleTimer++;

  if (obstacleTimer >= obstacleInterval) {
    generateObstacle();
    obstacleTimer = 0;
    obstacleInterval = 70 + Math.floor(Math.random() * 45);
  }

  for (let i = obstacles.length - 1; i >= 0; i--) {
    obstacles[i].x -= speed;

    if (obstacles[i].x + obstacles[i].width < 0) {
      obstacles.splice(i, 1);
      score++;
      scoreEl.textContent = "Score: " + score;

      if (score % 5 === 0) {
        speed += 0.4;
      }
    }
  }
}

function isColliding(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

function checkCollisions() {
  for (const obstacle of obstacles) {
    if (isColliding(player, obstacle)) {
      gameOver = true;
      statusEl.textContent = "Game Over - Final Score: " + score;
      break;
    }
  }
}

function drawGround() {
  ctx.fillStyle = "#8d6e63";
  ctx.fillRect(0, groundY, canvas.width, 4);

  ctx.strokeStyle = "#6d4c41";
  ctx.lineWidth = 2;

  for (let x = 0; x < canvas.width; x += 30) {
    ctx.beginPath();
    ctx.moveTo(x, groundY + 4);
    ctx.lineTo(x + 16, groundY + 4);
    ctx.stroke();
  }
}

function drawPlayer() {
  ctx.fillStyle = "#2d3436";
  ctx.fillRect(player.x, player.y, player.width, player.height);

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(player.x + 26, player.y + 8, 8, 8);
}

function drawObstacles() {
  ctx.fillStyle = "#2e7d32";

  obstacles.forEach(obstacle => {
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    ctx.fillRect(obstacle.x + 4, obstacle.y - 10, 6, 12);
    ctx.fillRect(obstacle.x + obstacle.width - 10, obstacle.y - 8, 6, 10);
  });
}

function drawGameOver() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.45)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#fff";
  ctx.font = "bold 36px Arial";
  ctx.textAlign = "center";
  ctx.fillText("GAME OVER", canvas.width / 2, 110);

  ctx.font = "24px Arial";
  ctx.fillText("Final Score: " + score, canvas.width / 2, 155);

  ctx.font = "18px Arial";
  ctx.fillText("Press enter to restart the game", canvas.width / 2, 195);
  ctx.textAlign = "start";
}

function drawBackground() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#ffd54f";
  ctx.beginPath();
  ctx.arc(700, 60, 28, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "rgba(255,255,255,0.85)";
  ctx.fillRect(100, 50, 70, 20);
  ctx.fillRect(140, 35, 60, 25);
  ctx.fillRect(420, 70, 80, 22);
  ctx.fillRect(455, 52, 55, 24);
}

function gameLoop() {
  drawBackground();
  drawGround();
  drawPlayer();
  drawObstacles();
  if (!gameOver) {
    applyGravity();
    updateObstacles();
    checkCollisions();
    frame++;
    requestAnimationFrame(gameLoop);
  } else {
    drawGameOver();
  }
}

actionBtn.addEventListener("click", resetGame);
document.addEventListener("keydown", handleInput);