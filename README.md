# Economics Rescue

A static, responsive ISC Class 12 Economics teaching app. No framework, backend, database, or build step is required.

## Structure

- `index.html` — course home
- `menu.html` — mission menu
- `demand.html` — Demand unit map
- `mission.html` — reusable mission shell
- `missions/` — mission-specific lesson logic/content
- `assets/css/app.css` — shared responsive design system
- `assets/js/` — shared theme, shell and interaction utilities
- `demand-1.html` … `demand-6.html` — tiny compatibility redirects for old links

## Local preview

Run any static server from this folder, for example:

```bash
python -m http.server 8000
```

Open `http://localhost:8000`.

## Deployment

Cloudflare Pages can publish the repository root directly. No build command is needed.


Update v23: Cost & Revenue now includes all 7 live missions.


Update v26: Producer’s Equilibrium added as a four-mission live chapter.
