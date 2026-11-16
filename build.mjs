// Zero-dependency static site generator.
//   node build.mjs
// Reads content.mjs and writes: index.html (EN), es/index.html (ES), 404.html, sitemap.xml, robots.txt
import { mkdirSync, writeFileSync } from 'node:fs';
import { site, content } from './content.mjs';
import { heroArt } from './art.mjs';

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const today = new Date();
const BUILD_ISO = today.toISOString().slice(0, 10);

const li = (items, cls = '') =>
  `<ul class="chips ${cls}">${items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`;

// Relative prefixes so the site also works when previewed from a folder or file://
const rel = (key) => (key === 'es' ? { assets: '../assets/', self: '', other: '../' } : { assets: 'assets/', self: '', other: 'es/' });

function jsonLd(c) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.name,
    url: site.url + c.path,
    jobTitle: c.hero.role,
    sameAs: [site.github, site.linkedin, site.credly],
    knowsAbout: ['Data engineering', 'MLOps', 'Databricks', 'Google Cloud', 'Azure', 'Python', 'Data governance'],
  });
}

function head(key) {
  const c = content[key];
  const other = key === 'en' ? 'es' : 'en';
  const r = rel(key);
  return `<!doctype html>
<html lang="${c.htmlLang}" data-theme="dark">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(c.title)}</title>
<meta name="description" content="${esc(c.description)}">
<link rel="canonical" href="${site.url}${c.path}">
<link rel="alternate" hreflang="en" href="${site.url}/">
<link rel="alternate" hreflang="es" href="${site.url}/es/">
<link rel="alternate" hreflang="x-default" href="${site.url}/">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(c.title)}">
<meta property="og:description" content="${esc(c.description)}">
<meta property="og:url" content="${site.url}${c.path}">
<meta property="og:locale" content="${key === 'en' ? 'en_US' : 'es_MX'}">
<meta property="og:locale:alternate" content="${other === 'en' ? 'en_US' : 'es_MX'}">
<meta name="twitter:card" content="summary">
<meta name="color-scheme" content="dark light">
<link rel="icon" href="${r.assets}favicon.svg" type="image/svg+xml">
<script>(function(){try{var t=localStorage.getItem('theme');if(!t){t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}document.documentElement.setAttribute('data-theme',t);}catch(e){}})();</script>
<link rel="stylesheet" href="${r.assets}styles.css">
<script type="application/ld+json">${jsonLd(c)}</script>
</head>`;
}

function header(key) {
  const c = content[key];
  const r = rel(key);
  const other = key === 'en' ? 'es' : 'en';
  return `<a class="skip" href="#main">${esc(c.ui.skip)}</a>
<header class="site-header">
  <div class="wrap bar">
    <a class="brand" href="#top" aria-label="${esc(site.name)}"><span class="brand-path">~/</span>${esc(site.handle)}<span class="cursor" aria-hidden="true">_</span></a>
    <nav class="nav" aria-label="Main">
      ${c.nav.map((n) => `<a href="#${n.id}">${esc(n.label)}</a>`).join('\n      ')}
    </nav>
    <div class="controls">
      <a class="btn-ghost lang" href="${r.other}" hreflang="${other}" lang="${other}" data-lang="${other}" title="${esc(c.ui.langTitle)}">${esc(c.ui.langShort)}</a>
      <button class="btn-ghost theme" type="button" aria-label="${esc(c.ui.theme)}" title="${esc(c.ui.theme)}">
        <svg class="i-sun" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
        <svg class="i-moon" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>
      </button>
    </div>
  </div>
</header>`;
}

function hero(key) {
  const c = content[key];
  const h = c.hero;
  return `<section class="hero" id="top">
  <div class="wrap">
    <div class="hero-grid">
      <div class="hero-copy">
        <p class="kicker mono">${esc(h.kicker)}</p>
        <h1>${esc(h.name)}</h1>
        <p class="role mono">${esc(h.role)}</p>
        <p class="lead">${esc(h.lead)}</p>
        <p class="sub">${esc(h.sub)}</p>
        <div class="cta">
          <a class="btn primary" href="${esc(h.ctaPrimary.href)}">${esc(h.ctaPrimary.label)}</a>
          <a class="btn" href="${esc(h.ctaSecondary.href)}">${esc(h.ctaSecondary.label)}</a>
        </div>
        <p class="status mono"><span class="dot" aria-hidden="true"></span>${esc(h.status)}</p>
      </div>
      <div class="hero-art">
        ${heroArt(c.ui)}
      </div>
    </div>
    <div class="stats">
      ${c.stats.map((s) => `<div class="stat"><strong>${esc(s.value)}</strong><span>${esc(s.label)}</span></div>`).join('\n      ')}
    </div>
  </div>
</section>`;
}

function sectionHead(s) {
  return `<header class="section-head">
      <p class="label mono">${esc(s.label)}</p>
      <h2>${esc(s.title)}</h2>
      <p class="intro">${esc(s.intro)}</p>
    </header>`;
}

function work(key) {
  const c = content[key];
  const w = c.work;
  return `<section class="section" id="work" aria-labelledby="work-title">
    <div class="wrap">
    ${sectionHead(w).replace('<h2>', '<h2 id="work-title">')}
    <div class="grid cases">
      ${w.cases
        .map(
          (cs) => `<article class="card case">
        <header><h3>${esc(cs.title)}</h3><p class="meta mono">${esc(cs.meta)}</p></header>
        <dl>
          <dt>${esc(w.labels.problem)}</dt><dd>${esc(cs.problem)}</dd>
          <dt>${esc(w.labels.approach)}</dt><dd>${esc(cs.approach)}</dd>
          <dt>${esc(w.labels.results)}</dt>
          <dd><ul class="results">${cs.results.map((r) => `<li>${esc(r)}</li>`).join('')}</ul></dd>
        </dl>
        ${li(cs.stack)}
      </article>`
        )
        .join('\n      ')}
    </div>
    </div>
  </section>`;
}

function projects(key) {
  const c = content[key];
  const p = c.projects;
  return `<section class="section" id="projects" aria-labelledby="projects-title">
    <div class="wrap">
    ${sectionHead(p).replace('<h2>', '<h2 id="projects-title">')}
    <div class="filters" role="group" aria-label="${esc(c.ui.filterLabel)}" hidden>
      ${p.filters
        .map(
          (f, i) =>
            `<button type="button" class="filter" data-filter="${f.id}" aria-pressed="${i === 0 ? 'true' : 'false'}">${esc(f.label)}</button>`
        )
        .join('\n      ')}
    </div>
    <div class="grid projects">
      ${p.items
        .map(
          (it) => `<article class="card project" data-tags="${it.tags.join(' ')}">
        <h3>${esc(it.title)}</h3>
        <p>${esc(it.desc)}</p>
        ${li(it.chips)}
        <p class="note mono">// ${esc(it.note)}</p>
        <p class="links mono">${it.links
          .map((l) => `<a href="${esc(l.href)}" target="_blank" rel="noopener noreferrer">${esc(l.label)}<span aria-hidden="true"> ↗</span></a>`)
          .join('')}</p>
      </article>`
        )
        .join('\n      ')}
    </div>
    </div>
  </section>`;
}

function keyboards(key) {
  const c = content[key];
  const k = c.keyboards;
  return `<section class="section" id="keyboards" aria-labelledby="keyboards-title">
    <div class="wrap">
    ${sectionHead(k).replace('<h2>', '<h2 id="keyboards-title">')}
    <div class="card kb">
      <div class="kb-text">
        ${k.body.map((b) => `<p>${esc(b)}</p>`).join('\n        ')}
        ${li(k.chips)}
        <p class="links mono">${k.links
          .map((l) => `<a href="${esc(l.href)}" target="_blank" rel="noopener noreferrer">${esc(l.label)}<span aria-hidden="true"> ↗</span></a>`)
          .join('')}</p>
        <p class="note mono">// ${esc(k.aside)}</p>
      </div>
      <div class="kb-keys" aria-hidden="true">
        <div class="keycaps">${[...k.keycapsWord].map((ch) => `<span class="keycap" data-key="${ch}">${ch}</span>`).join('')}</div>
        <p class="hint mono">${esc(k.keycapsLabel)}</p>
      </div>
    </div>
    <div class="card collection" data-egg="${esc(k.egg)}">
      <h3 class="mono"><span class="p-cmd">$</span> ${esc(k.collection.cmd)}</h3>
      <ul class="kb-list">
        ${k.collection.items
          .map(
            (i) =>
              `<li><span class="kb-name">${i.href ? `<a href="${esc(i.href)}" target="_blank" rel="noopener noreferrer">${esc(i.name)}<span aria-hidden="true"> ↗</span></a>` : esc(i.name)}</span><span class="kb-note">${esc(i.note)}</span></li>`
          )
          .join('\n        ')}
      </ul>
      <p class="note mono">// ${esc(k.collection.verdict)}</p>
    </div>
    </div>
  </section>`;
}

function lessons(key) {
  const c = content[key];
  const l = c.lessons;
  return `<section class="section" id="lessons" aria-labelledby="lessons-title">
    <div class="wrap">
    ${sectionHead(l).replace('<h2>', '<h2 id="lessons-title">')}
    <div class="grid lessons">
      ${l.items
        .map(
          (it) => `<article class="card lesson">
        <p class="lesson-num mono" aria-hidden="true">${esc(it.num)}</p>
        <h3>${esc(it.title)}</h3>
        <p class="story">${esc(it.story)}</p>
        <p class="rules-label mono">${esc(l.rulesLabel)}</p>
        <ul class="results">${it.rules.map((r) => `<li>${esc(r)}</li>`).join('')}</ul>
        <pre class="proof mono" aria-label="${esc(it.proof.join(' '))}"><span class="p-cmd">${esc(it.proof[0])}</span>\n${esc(it.proof[1])}\n<span class="p-note">${esc(it.proof[2])}</span></pre>
      </article>`
        )
        .join('\n      ')}
    </div>
    </div>
  </section>`;
}

function teaching(key) {
  const c = content[key];
  const t = c.teaching;
  return `<section class="section" id="teaching" aria-labelledby="teaching-title">
    <div class="wrap">
    ${sectionHead(t).replace('<h2>', '<h2 id="teaching-title">')}
    <div class="grid three">
      ${t.items.map((i) => `<article class="card"><h3>${esc(i.title)}</h3><p>${esc(i.desc)}</p></article>`).join('\n      ')}
    </div>
    </div>
  </section>`;
}

function stack(key) {
  const c = content[key];
  const s = c.stack;
  return `<section class="section" id="stack" aria-labelledby="stack-title">
    <div class="wrap">
    <header class="section-head">
      <p class="label mono">${esc(s.label)}</p>
      <h2 id="stack-title">${esc(s.title)}</h2>
    </header>
    <div class="stack">
      ${s.groups.map((g) => `<div class="stack-row"><h3 class="mono">${esc(g.name)}</h3>${li(g.items)}</div>`).join('\n      ')}
      <div class="stack-row"><h3 class="mono">${esc(s.certsLabel)}</h3><div class="certs-col"><ul class="chips certs">${s.certs.map((i) => `<li><a href="${esc(i.href || site.credly)}" target="_blank" rel="noopener noreferrer">${esc(i.name)}</a></li>`).join('')}</ul><p class="links mono"><a href="${esc(site.credly)}" target="_blank" rel="noopener noreferrer">${esc(s.credlyLabel)}<span aria-hidden="true"> ↗</span></a></p></div></div>
    </div>
    </div>
  </section>`;
}

function contact(key) {
  const c = content[key];
  const ct = c.contact;
  return `<section class="section contact" id="contact" aria-labelledby="contact-title">
    <div class="wrap">
    ${sectionHead(ct).replace('<h2>', '<h2 id="contact-title">')}
    <ul class="contact-list mono">
      <li><span>${esc(ct.emailLabel)}</span><a href="mailto:${site.email}">${esc(site.email)}</a></li>
      <li><span>${esc(ct.githubLabel)}</span><a href="${site.github}" target="_blank" rel="noopener noreferrer">github.com/AldaCL</a></li>
      <li><span>${esc(ct.linkedinLabel)}</span><a href="${site.linkedin}" target="_blank" rel="noopener noreferrer">linkedin.com/in/aldacortes</a></li>
    </ul>
    </div>
  </section>`;
}

function footer(key) {
  const c = content[key];
  const fmt = new Intl.DateTimeFormat(c.htmlLang === 'es' ? 'es-MX' : 'en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(today);
  const r = rel(key);
  return `<footer class="site-footer">
  <div class="wrap">
    <p>${esc(c.footer.built)}</p>
    <p class="mono">© ${today.getUTCFullYear()} ${esc(site.name)} · ${esc(c.footer.updated)}: ${esc(fmt)}</p>
  </div>
</footer>
<script src="${r.assets}main.js" defer></script>
</body>
</html>`;
}

function page(key) {
  return [
    head(key),
    `<body>`,
    header(key),
    `<main id="main">`,
    hero(key),
    work(key),
    projects(key),
    keyboards(key),
    lessons(key),
    teaching(key),
    stack(key),
    contact(key),
    `</main>`,
    footer(key),
  ].join('\n');
}

function notFound() {
  const en = content.en;
  const es = content.es;
  const block = (c) => `<section class="nf">
      <p class="kicker mono">$ curl -I ${esc(site.url)}</p>
      <h1>${esc(c.notFound.title)}</h1>
      <p class="lead">${esc(c.notFound.body)}</p>
      <p><a class="btn primary" href="${c.notFound.backHref}">${esc(c.notFound.back)}</a></p>
    </section>`;
  return `<!doctype html>
<html lang="en" data-theme="dark">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>404 · ${esc(site.name)}</title>
<meta name="robots" content="noindex">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<script>(function(){try{var t=localStorage.getItem('theme');if(!t){t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}document.documentElement.setAttribute('data-theme',t);}catch(e){}})();</script>
<link rel="stylesheet" href="/assets/styles.css">
</head>
<body class="page-404">
  <main class="wrap">
    ${block(en)}
    <hr class="sep">
    <div lang="es">${block(es)}</div>
  </main>
</body>
</html>`;
}

mkdirSync('es', { recursive: true });
writeFileSync('index.html', page('en'));
writeFileSync('es/index.html', page('es'));
writeFileSync('404.html', notFound());
writeFileSync(
  'sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url><loc>${site.url}/</loc><lastmod>${BUILD_ISO}</lastmod><xhtml:link rel="alternate" hreflang="es" href="${site.url}/es/"/></url>
  <url><loc>${site.url}/es/</loc><lastmod>${BUILD_ISO}</lastmod><xhtml:link rel="alternate" hreflang="en" href="${site.url}/"/></url>
</urlset>
`
);
writeFileSync('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${site.url}/sitemap.xml\n`);
console.log('built: index.html, es/index.html, 404.html, sitemap.xml, robots.txt');
