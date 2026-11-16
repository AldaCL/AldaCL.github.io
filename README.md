# aldacl.github.io

Personal site of Aldair Cortés. Static, bilingual (EN at `/`, ES at `/es/`), no frameworks and no runtime dependencies.

## Edit the content

All text lives in `content.mjs` (English and Spanish side by side). After editing, regenerate the pages:

```sh
node build.mjs
```

This rewrites `index.html`, `es/index.html`, `404.html`, `sitemap.xml` and `robots.txt`. Commit the result and push to `main`; GitHub Pages serves the files as they are.

## Files

| Path | What it is |
| --- | --- |
| `content.mjs` | All copy, projects, case studies and links (EN and ES). |
| `build.mjs` | Zero-dependency generator (needs Node 18+). |
| `art.mjs` | The hero illustration (a tiny keyboard whose keys tap in a wave). |
| `assets/styles.css` | Design: clean terminal, light and dark themes, system fonts only. |
| `assets/main.js` | Theme toggle, project filters, keycaps, scroll reveal, easter egg, console message. Motion is off with `prefers-reduced-motion`. |
| `.nojekyll` | Tells GitHub Pages to serve the files without Jekyll processing. |

## Deploy

GitHub Pages: Settings → Pages → Source: "Deploy from a branch" → `main` / `(root)`.
