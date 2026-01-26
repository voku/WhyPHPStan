<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Code Crash Simulator

Code Crash Simulator is a Vite + React experience that visualizes how tests, types, and static analysis keep bugs from reaching production. It pairs an interactive dashboard with narrative scenarios to show when failures are caught and how to prevent them.

## Features

- Interactive simulation that steps through design, build, and runtime failure stages.
- Toggleable safety systems (tests, types, static analysis) to see outcome changes.
- Story-driven scenarios that map real-world coding mistakes to safety outcomes.
- Static, production-ready build that deploys cleanly to GitHub Pages.

## Quick Start

**Prerequisites:** Node.js 20+ and npm.

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Production Build

```bash
npm run build
npm run preview
```

The optimized build output lives in `dist/` and is ready for any static hosting provider.

## GitHub Pages Deployment

This repo ships with a GitHub Actions workflow that builds and deploys the `dist/` folder.

1. Enable GitHub Pages in repository settings:
   - **Source:** GitHub Actions
2. Push to `main` (or run the workflow manually) to trigger deployment.

The site will publish to `https://<org>.github.io/WhyPHPStan/`.

## Key Files

- `index.html`: HTML entry point and asset links.
- `index.tsx`: React entry point and root render.
- `App.tsx`: Main UI composition and simulation flow.
- `components/`: UI building blocks (timeline, controls, console).
- `data/scenarios.ts`: Scenario definitions and outcomes.
- `vite.config.ts`: Vite configuration, including GitHub Pages base path.
- `.github/workflows/`: CI testing and GitHub Pages deployment workflows.

## Helper Prompt: Key Files Detector

Use this prompt with your favorite AI assistant to map changes to the right files quickly.

```text
You are a "Key Files Detector" for the Code Crash Simulator repo. Given a requested change,
identify the exact files to edit and explain why. Return a short bullet list of file paths
and the responsibilities they own. If a change might involve build or deployment, include
any relevant config or workflow files.
```

## Contributing

Open an issue or pull request at https://github.com/voku/WhyPHPStan.
