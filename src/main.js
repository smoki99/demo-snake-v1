import { createGame, placeFood, setDir, step } from "./game.js";

const CELL = 20;
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const scoreEl = document.getElementById("score");

let state = start();

function start() {
  return placeFood(createGame());
}

const KEYS = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
};

document.addEventListener("keydown", (e) => {
  if (KEYS[e.key]) {
    e.preventDefault();
    setDir(state, KEYS[e.key]);
  } else if (e.key === " " && state.gameOver) {
    state = start();
  }
});

function draw() {
  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#e74c3c";
  if (state.food) ctx.fillRect(state.food.x * CELL, state.food.y * CELL, CELL, CELL);

  ctx.fillStyle = state.gameOver ? "#e74c3c" : "#2ecc71";
  for (const s of state.snake) ctx.fillRect(s.x * CELL, s.y * CELL, CELL - 1, CELL - 1);

  scoreEl.textContent = `Score: ${state.score}${state.gameOver ? " — game over, press space" : ""}`;
}

setInterval(() => {
  step(state);
  draw();
}, 120);

draw();
