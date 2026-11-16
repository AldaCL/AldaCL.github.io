// Hero illustration: a tiny ortholinear keyboard whose keys tap in a diagonal wave over a PCB.
// Decorative (aria-hidden) and renders fine, frozen, without JavaScript. Motion lives in assets/styles.css.

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function heroArt(ui) {
  const rows = [
    ['{', '}', '(', ')', '[', ']', '<', '>', '/', '\\'],
    ['A', 'L', 'D', 'A', '_', '=', ';', ':', '?', '!'],
    ['+', '-', '*', '%', '&', '|', '^', '~', '@', '$'],
    ['esc', 'sft', 'ctl', 'alt', '\u2423', '\u2423', 'alt', 'ctl', 'sft', '\u21b5'],
  ];
  const keys = rows
    .map((row, r) =>
      row
        .map((k, c) => `<span class="k${r === 1 && c < 4 ? ' hot' : ''}" style="--d:${r + c}">${esc(k)}</span>`)
        .join('')
    )
    .join('');
  return `<div class="art" data-art="keys" aria-hidden="true">
    <div class="board">
      <svg class="traces" viewBox="0 0 400 200" preserveAspectRatio="none" focusable="false">
        <path d="M0 40H120L150 70H280L310 40H400"/>
        <path d="M0 110H70L100 140H250L280 110H400"/>
        <path d="M0 170H160L190 150H400"/>
        <path d="M60 0V60L90 90V200"/>
        <path d="M340 0V50L310 80V200"/>
      </svg>
      <div class="keys">${keys}</div>
    </div>
    <p class="art-cap mono">${esc(ui.art)}</p>
  </div>`;
}
