# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev        # Start dev server with HMR
pnpm build      # TypeScript check (tsc -b) + Vite production build
pnpm lint       # ESLint (flat config format)
pnpm preview    # Preview production build locally
```

pnpm test        # Vitest watch mode
pnpm test:run    # Single run (CI)
pnpm test:ui     # Browser UI for tests

## Architecture

React 19 + TypeScript + Vite starter. Single entry point: `index.html` → `src/main.tsx` → `src/App.tsx`.

**Key details:**
- Uses **pnpm** (not npm/yarn)
- **React Compiler** (experimental) is enabled via `babel-plugin-react-compiler` in `vite.config.ts` — avoid manual `useMemo`/`useCallback` as the compiler handles these
- ESLint uses the **flat config** format (`eslint.config.js`) — not the legacy `.eslintrc` format
- Two tsconfig files: `tsconfig.app.json` (src code, ES2023, strict) and `tsconfig.node.json` (build tools)
- TypeScript strict mode is on; `noUnusedLocals` and `noUnusedParameters` are enforced
