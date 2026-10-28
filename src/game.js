// Pure snake game logic — no DOM, fully testable.

export const GRID = 20; // 20x20 cells

export function createGame(grid = GRID) {
  const mid = Math.floor(grid / 2);
  return {
    grid,
    snake: [
      { x: mid, y: mid },
      { x: mid - 1, y: mid },
      { x: mid - 2, y: mid },
    ],
    dir: { x: 1, y: 0 }, // moving right
    food: null,
    score: 0,
    gameOver: false,
  };
}

export function placeFood(state, rand = Math.random) {
  const free = [];
  for (let y = 0; y < state.grid; y++) {
    for (let x = 0; x < state.grid; x++) {
      if (!state.snake.some((s) => s.x === x && s.y === y)) {
        free.push({ x, y });
      }
    }
  }
  state.food = free.length ? free[Math.floor(rand() * free.length)] : null;
  return state;
}

// Ignore direct reversals (can't turn 180° into yourself).
export function setDir(state, next) {
  if (!state.gameOver && (next.x !== -state.dir.x || next.y !== -state.dir.y)) {
    state.dir = next;
  }
  return state;
}

export function step(state, rand = Math.random) {
  if (state.gameOver) return state;
  const head = { x: state.snake[0].x + state.dir.x, y: state.snake[0].y + state.dir.y };

  const hitWall = head.x < 0 || head.y < 0 || head.x >= state.grid || head.y >= state.grid;
  const hitSelf = state.snake.some((s) => s.x === head.x && s.y === head.y);
  if (hitWall || hitSelf) {
    state.gameOver = true;
    return state;
  }

  state.snake.unshift(head);

  if (state.food && head.x === state.food.x && head.y === state.food.y) {
    state.score++;
    placeFood(state, rand); // eat: don't pop tail => grow
  } else {
    state.snake.pop();
  }
  return state;
}
