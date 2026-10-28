import { GRID, createGame, placeFood, setDir, step } from "../src/game.js";
import { test, expect, describe } from "bun:test";

const seqRand = (values) => () => values.shift();

test("createGame starts centered moving right", () => {
  const g = createGame();
  expect(g.snake.length).toBe(3);
  expect(g.snake[0]).toEqual({ x: 10, y: 10 });
  expect(g.dir).toEqual({ x: 1, y: 0 });
  expect(g.gameOver).toBe(false);
});

test("step moves head and keeps length when not eating", () => {
  const g = placeFood(createGame(), seqRand([0]));
  step(g);
  expect(g.snake[0]).toEqual({ x: 11, y: 10 });
  expect(g.snake.length).toBe(3);
  expect(g.score).toBe(0);
});

test("eating food grows snake and increases score", () => {
  const g = createGame();
  g.food = { x: 11, y: 10 }; // directly in front of head
  step(g, seqRand([0]));
  expect(g.score).toBe(1);
  expect(g.snake.length).toBe(4);
  expect(g.food).not.toEqual({ x: 11, y: 10 }); // food moved
});

test("hitting wall ends game", () => {
  const g = createGame(GRID);
  g.snake = [{ x: GRID - 1, y: 0 }];
  g.dir = { x: 1, y: 0 };
  step(g);
  expect(g.gameOver).toBe(true);
});

test("hitting self ends game", () => {
  const g = createGame();
  g.snake = [
    { x: 5, y: 5 },
    { x: 6, y: 5 },
    { x: 6, y: 6 },
    { x: 5, y: 6 },
  ];
  g.dir = { x: 0, y: 1 }; // moving down into own body
  step(g);
  expect(g.gameOver).toBe(true);
});

describe("setDir", () => {
  test("blocks 180-degree reversal", () => {
    const g = createGame(); // dir right
    setDir(g, { x: -1, y: 0 });
    expect(g.dir).toEqual({ x: 1, y: 0 });
  });

  test("allows perpendicular turns", () => {
    const g = createGame();
    setDir(g, { x: 0, y: -1 });
    expect(g.dir).toEqual({ x: 0, y: -1 });
  });
});

test("placeFood never spawns on the snake", () => {
  const g = createGame(3);
  g.snake = [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 2, y: 1 },
  ];
  placeFood(g, seqRand([0]));
  expect(g.food).toEqual({ x: 0, y: 1 }); // first free cell
});

test("step is a no-op after game over", () => {
  const g = createGame();
  g.gameOver = true;
  const before = JSON.stringify(g.snake);
  step(g);
  expect(JSON.stringify(g.snake)).toBe(before);
});
