# AGENT.md — Snake Game

## Project rules
- Language: **JavaScript** (plain `.js`, no TypeScript).
- Runtime / tooling: **Bun** (`bun run`, `bun test`, `bunx`).
- Target: runs in the **web browser** (canvas-based, no framework, no build step required).

## Conventions
- Keep it simple. Do not overthink — small functions, minimal files, no premature abstraction.
- Game logic lives in `src/game.js` as pure functions (no DOM access) so it is testable.
- Rendering / input lives in `src/main.js` (browser-only).
- Tests live in `tests/` and run with `bun test`.

## Commands
- Start dev server: `bun run serve` (or `bun --serve .`)
- Run tests: `bun test`
