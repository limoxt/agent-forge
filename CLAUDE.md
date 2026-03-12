# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What is Agent Forge

A pixel RPG-styled AI agent marketplace built with Next.js 14. Displays 120+ specialist AI agents across 12 categories, sourced from [agency-agents](https://github.com/msitarzewski/agency-agents). Users can browse, filter, search, and download agents as either standalone agent configs or skills (ZIP exports generated client-side with JSZip).

Deployed on Vercel: https://agent-forge-chi.vercel.app

## Commands

```bash
npm run dev       # Dev server on localhost:3000
npm run build     # Production build
npm start         # Run production server
npm run lint      # ESLint
```

No test framework is configured.

## Architecture

- **Next.js 14 App Router** with TypeScript, Tailwind CSS
- Server components render the page (`app/page.tsx`), client components handle interactivity (`components/AgentGrid.tsx`, `components/AgentCard.tsx`)
- Agent data lives in `data/agents.json` (static JSON, not a database)
- `lib/download.ts` generates ZIP files client-side using dynamic import of JSZip (dynamic import required to avoid SSR build errors)
- `next.config.mjs` includes a webpack fallback that disables `fs` for browser builds

## Key conventions

- Two fonts define the pixel aesthetic: **Press Start 2P** (titles/buttons) and **VT323** (body text)
- Category colors are mapped in `lib/colors.ts` — add new categories there
- CSS visual effects (scanlines, pixel grid, pixel-card, pixel-btn) are in `app/globals.css` using CSS variables
- Download functions produce two ZIP formats: agent config (full personality markdown) and skill config (for integrating into existing agents)
