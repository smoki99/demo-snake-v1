# demo-snake-v1

A tiny browser snake game written in plain **JavaScript**, running on **Bun** — no framework, no build step.

![snake](https://img.shields.io/badge/bun-test%209%2F-brightgreen)

## Run it

```bash
bun run serve   # http://localhost:3456
bun test        # 9 tests on the pure game logic
```

## Controls

- Arrow keys — move
- Space — restart after game over

## Layout

| File | Purpose |
| --- | --- |
| `src/game.js` | Pure game logic (movement, collisions, food, score). No DOM, fully unit-tested. |
| `src/main.js` | Canvas rendering + keyboard input (browser only). |
| `serve.js` | Minimal static server that accepts any `Host` header (works behind a tunnel/proxy). |
| `tests/game.test.js` | `bun test` suite. |
| `AGENT.md` | Project rules for AI agents working on this codebase. |

## Notes

Game state is mutated in place by small functions so the logic stays easy to test:
`createGame()` → `placeFood()` → loop of `setDir()` / `step()`. Reversing 180° into yourself
is ignored; hitting a wall or your own body sets `gameOver`, after which `step()` is a no-op.
