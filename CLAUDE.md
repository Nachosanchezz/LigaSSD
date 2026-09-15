# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (Next.js)
npm run build    # Production build
npm run lint     # Run ESLint
npx tsc --noEmit # Typecheck (run `npx next typegen` first after moving routes)
```

No test suite is configured.

## Architecture

This is a **Next.js 16 + TypeScript + Tailwind CSS v4** web app for Liga SSD, a recreational futsal league played in Torrelodones. The league runs in **splits** (seasons): the current one (Split 3) lives at the root of the site; past splits are archived under `/split2` and `/split1`.

### Data layer (`data/` and `lib/`)

Fixtures, teams and players are **hardcoded in TypeScript**. Results are entered from `/admin` and stored in **Supabase** (`resultados`, `goles`, `arbitros`, `estados_partido`, keyed by match id); `lib/queries.ts` (`fetchOverrides` + `aplicarOverrides`) merges them onto the static matches at render time.

- `data/tipos.ts` — shared `Partido`, `Jornada`, `EventoGol`, `ResumenPartido`, `EstadoPartido` types.
- `data/personas.ts` — **one record per person across all splits**. Split 2 players are derived from `data/split2/equipos.ts` (id = Split 2 id without the team prefix, e.g. `old-school-cifu` → `cifu`); new players go in `nuevos`.
- `data/split3/equipos.ts` — the 6 Split 3 teams. Each has a stable `id` (used in match ids, never changes) and a `nombre`/`slug` that can be renamed. `plantilla` references persona ids, with the auction `precio` (M€) and a `presidente` flag.
- `data/split3/partidos.ts` — liguilla fixture (double round-robin, 10 jornadas) generated with the circle method. Match ids: `s3-j{N}-{localId}-{visitanteId}`. Dates go in `PROGRAMACION`.
- `data/split3/fases.ts` — play-in (triangular A = 1º/3º/6º, B = 2º/4º/5º), semis (1ºA–2ºB, 1ºB–2ºA) and final. Ids `s3-ta-N`, `s3-tb-N`, `s3-sf1`, `s3-sf2`, `s3-final`.
- `data/split2/` — archived Split 2 (`equipos.ts`, `partidos.ts`, `playoffs.ts`). `data/split1.ts` — archived Split 1 (summary data only).
- `lib/split3.ts` — `getSplit3()` builds the whole competition (standings, triangulars, semis, final, champion) resolving each phase from the previous one.
- `lib/clasificacion.ts` — standings for any split. Split 3 uses `enfrentamientoDirecto` (pts → head-to-head once all matches between the tied teams are played → dg → gf); triangulars fall back to liguilla position.
- `lib/resultado.ts` — parses results: `"3-2"`, or `"4-4 (5-3 pen.)"` for knockout draws (extra time then penalties).
- `lib/estadisticas.ts` / `lib/jugadores.ts` — goal/assist/MVP counting by matching acta names to players (full name, apodo, `alias`).

### Pages

Server Components except `Navbar`, `SplitSubnav`, `EstadisticasTabs` and `NoticiasCarrusel`. Shared UI lives in `components/` (`JornadasLista`, `ActaPartido`, `TablaClasificacion`, `Escudo`, `EstadisticasTabs`) and is used by both Split 2 and Split 3 pages.

- Root (Split 3): `/clasificacion`, `/jornadas`, `/playoffs`, `/estadisticas`, `/equipos/[slug]`, `/partidos/[id]` (all Split 3 actas, including play-in and playoff), `/jugadores/[id]` (unified person page with history per split).
- `/split2/*` — full Split 2 archive with its own tab bar (`app/split2/layout.tsx`). `/split2/jugadores/[id]` redirects to the unified `/jugadores/[id]`.
- `/split1/*` — Split 1 archive.
- `next.config.ts` redirects old Split 2 URLs (`/partidos/j…`, `/playoffs/qf1…`, `/equipos/{split2-slug}`, `/jugadores/{split2-id}`) to `/split2`.
- `/admin` — password-protected result entry for Split 3 (Split 2 matches still editable by URL).

### Conventions

- Player references in actas use **apodos** (or full names); they must match a player's name, apodo or `alias` for stats to aggregate. In Split 3 a name shared by two players is ignored in rankings.
- Team names use exact casing including accents (e.g. `"FILÓSOFOS"`, `"BODØ DREAM"`, `"AÇAI BOYS"`).
- Logos live in `public/equipos/{slug}.png`. Split 3 teams without a logo show a coloured initial (`components/Escudo.tsx`, `color` in `data/split3/equipos.ts`).
- Color palette: dark navy `#091f36` / `#0b4a6f`, yellow accent `#facc15` (yellow-400), light background `slate-50`.
