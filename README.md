# BookedUp — Vite + React + Tailwind (Railway-ready)

This is a fully client-side SPA. It builds to static files and is served by `serve` so you can deploy it on **Railway** as a regular service (or as a Static Site if you prefer).

## Local dev
```bash
npm i
npm run dev
```

## Build
```bash
npm run build
```

## Run locally (production preview)
```bash
npm start
# opens http://localhost:8080
```

## Deploy to Railway (Service mode)
1. Push this repo to GitHub.
2. Create a **New Project** → **Deploy from Repo** in Railway.
3. On first deploy, Railway detects Node (Nixpacks) and will run:
   - Build: `npm ci && npm run build`
   - Start: `npm start` (serves `dist` via `serve` on `$PORT`)
4. Open the generated URL.

### Alternative: Railway Static Site
If you choose the **Static Site** product:
- Build command: `npm ci && npm run build`
- Output directory: `dist`

No server required in static mode.
