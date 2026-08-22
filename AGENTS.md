# AGENTS.md

## Cursor Cloud specific instructions

This is a static personal CV/portfolio website built with **Astro 7** using **Svelte 5** and **React 19** islands, Tailwind CSS v4, and the Vercel adapter. It is a single frontend service (no backend/database). Content is authored under `src/pages` (Astro pages) and `src/components`, with i18n (`en`/`es`) driven by `src/i18n`.

Standard commands are defined in `package.json` (`scripts`) and documented in `README.md`. Key ones:

- Dev server: `npm run dev` (add `-- --host` to bind externally). Serves at `http://localhost:4321/`.
- Build: `npm run build` (static output + Vercel adapter; writes `dist/` and `.vercel/`).
- Tests: `npm test` (Vitest, files match `src/**/*.test.ts`).
- Format check: `npx prettier --check .` — there is no dedicated `lint` script; Prettier is the formatter. The repo currently has many pre-existing formatting warnings, so a non-zero `--check` result is expected and does not indicate a regression from your change.

Non-obvious notes:

- Node: the environment uses Node 22.14. Some transitive deps (e.g. `undici`) print `EBADENGINE` warnings requesting Node >= 22.19; these are warnings only and do not break install, test, build, or dev.
- On first `npm run dev`, Vite performs a one-time dependency optimization/bundling step that takes ~10-15s before the first page fully renders; subsequent loads are fast.
- `.cursor/` is git-ignored (see `.gitignore`), so environment config is managed via the Cloud Agent snapshot rather than a committed `.cursor/environment.json`.
