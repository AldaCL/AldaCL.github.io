# aldacl.github.io

Personal site of Aldair Cortés. Static, bilingual (EN at `/`, ES at `/es/`), no frameworks and no runtime dependencies.

## Edit the content

All text lives in `content.mjs` (English and Spanish side by side). After editing, regenerate the pages:

```sh
node build.mjs
```

The design is chosen with `DESIGN=a|b|c node build.mjs` (default `a`). This rewrites `index.html`, `es/index.html`, `404.html`, `sitemap.xml` and `robots.txt`. Commit the result and push to `main`; GitHub Pages serves the files as they are.

## Files

| Path | What it is |
| --- | --- |
| `content.mjs` | All copy, projects, case studies and links (EN and ES). |
| `build.mjs` | Zero-dependency generator (needs Node 18+). |
| `art.mjs` | The hero illustration for each design (CanSat, orbit, keyboard). |
| `assets/styles.css` | Base styles and design A (clean terminal), light and dark themes, system fonts only. |
| `assets/design-b.css`, `assets/design-c.css` | Overrides for design B (mission control) and C (keycaps and PCB). |
| `assets/main.js` | Theme toggle, project filters, keycaps, hero animations, scroll reveal, console easter egg. All motion is off with `prefers-reduced-motion`. |
| `.nojekyll` | Tells GitHub Pages to serve the files without Jekyll processing. |

## Deploy

GitHub Pages: Settings → Pages → Source: "Deploy from a branch" → `main` / `(root)`.
