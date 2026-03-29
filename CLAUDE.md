# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (Next.js)
npm run build    # Production build
npm run lint     # Run ESLint
```

No test suite is configured.

## Architecture

This is a **Next.js 16 + TypeScript + Tailwind CSS v4** static-data web app for Liga SSD, a recreational futsal league played in Torrelodones.

### Data layer (`data/` and `lib/`)

All data is **hardcoded in TypeScript files** — there is no database or API:

- `data/equipos.ts` — defines `Equipo` and `Jugador` types, exports `equipos[]` (7 teams, ~7 players each with id, apodo, posicion, piernaBuena)
- `data/partidos.ts` — defines `Jornada`, `Partido`, `EventoGol`, `ResumenPartido` types, exports `jornadas[]` (7 rounds, round-robin where one team rests each week). Partido states: `"Pendiente de programar" | "Programado" | "Aplazado" | "Finalizado"`. Goals stored per-team with scorer apodo, optional assistant and minute.
- `lib/arbitrajes.ts` — helper that derives referee history for a team from `jornadas`

**Adding match results**: edit `data/partidos.ts`, set `estado: "Finalizado"`, add `resultado: "X-Y"`, populate `resumen` with goal events using player apodos (not IDs), and set `mvp`.

### Pages

All pages are **Server Components** (no `"use client"`) except `components/Navbar.tsx`. Classification and statistics are computed at render time by iterating `jornadas`.

- `/clasificacion` — computes standings inline: sorts by pts → dg → gf → name
- `/estadisticas` — player stats (goals, assists) derived by scanning `resumen` across all finished matches
- `/jugadores` — lists all players across all teams
- `/equipos/[slug]` — team detail; slug matches `Equipo.slug`
- `/partidos/[id]` — match detail; id matches `Partido.id` format `j{N}-{local-slug}-{visitante-slug}`
- `/jornadas` — calendar and results grouped by jornada

### Conventions

- Player references in `resumen` use **apodos** (nicknames), not IDs. Apodos must match exactly for stats to aggregate correctly.
- Team names use exact casing including accents (e.g. `"FILÓSOFOS"`, `"BODØ DREAM"`, `"AÇAI BOYS"`).
- Logos live in `public/equipos/{slug}.png`.
- Color palette: dark navy `#091f36` / `#0b4a6f`, yellow accent `#facc15` (yellow-400), light background `slate-50`.
