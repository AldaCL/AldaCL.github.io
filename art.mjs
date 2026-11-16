// Hero illustrations, one per design. Plain SVG/HTML + CSS; a few lines of JS (assets/main.js) make them move.
// Everything is decorative (aria-hidden) and renders fine, frozen, without JavaScript.

const readout = (label, value, key) =>
  `<div><dt>${label}</dt><dd data-r="${key}">${value}</dd></div>`;

// Design A: a CanSat (a satellite the size of a soda can) drifting down under its parachute.
function cansat(ui) {
  const t = ui.art;
  const ticks = Array.from({ length: 10 }, (_, i) => `<line x1="20" x2="${i % 3 === 0 ? 34 : 28}" y1="${24 + i * 32}" y2="${24 + i * 32}"/>`).join('');
  return `<div class="art art-cansat" data-art="cansat" aria-hidden="true">
    <div class="art-bar mono"><span class="dot"></span><span>${t.a}</span><span class="art-state" data-r="state">${t.descending}</span></div>
    <svg class="art-svg" viewBox="0 0 320 340" focusable="false">
      <g class="s-ticks">${ticks}</g>
      <text class="s-text" x="40" y="28">700 m</text>
      <text class="s-text" x="40" y="302">0 m</text>
      <line class="s-ground" x1="20" x2="300" y1="312" y2="312"/>
      <g class="s-ground-hatch"><path d="M40 312l-8 8M80 312l-8 8M120 312l-8 8M160 312l-8 8M200 312l-8 8M240 312l-8 8M280 312l-8 8"/></g>
      <g class="cs-sat" transform="translate(0 70)">
        <path class="s-chute" d="M96 46Q160 -34 224 46Q208 34 192 46Q176 32 160 46Q144 32 128 46Q112 34 96 46Z"/>
        <path class="s-line" d="M96 46L152 100M128 46L155 100M160 46V100M192 46L165 100M224 46L168 100"/>
        <rect class="s-can" x="146" y="100" width="28" height="50" rx="5"/>
        <path class="s-line" d="M146 112h28M146 138h28"/>
        <circle class="s-led" cx="160" cy="125" r="3"/>
        <path class="s-sig s-sig1" d="M182 118q8 7 0 14"/>
        <path class="s-sig s-sig2" d="M188 112q13 13 0 26"/>
      </g>
    </svg>
    <dl class="readouts mono">
      ${readout(t.alt, '412 m', 'alt')}${readout(t.vel, '8.1 m/s', 'vel')}${readout(t.temp, '21.4 °C', 'temp')}${readout(t.pkt, '042', 'pkt')}
    </dl>
  </div>`;
}

// Design B: mission control. A wireframe globe, an orbiting satellite and a mission clock.
function orbit(ui) {
  const t = ui.art;
  const stars = [
    [24, 30], [70, 80], [310, 40], [340, 120], [40, 200], [300, 250], [150, 18], [250, 22],
    [20, 120], [330, 200], [90, 270], [220, 280], [120, 50], [275, 90], [60, 150], [345, 60],
  ]
    .map(([x, y], i) => `<circle class="star" style="--i:${i}" cx="${x}" cy="${y}" r="${i % 4 === 0 ? 1.6 : 1}"/>`)
    .join('');
  return `<div class="art art-orbit" data-art="orbit" aria-hidden="true">
    <div class="art-bar mono"><span class="dot"></span><span>${t.b}</span><span class="art-state" data-clock>${t.clock} 00:00:00</span></div>
    <svg class="art-svg" viewBox="0 30 360 240" focusable="false">
      ${stars}
      <g class="globe">
        <circle class="g-body" cx="180" cy="150" r="74"/>
        <ellipse class="g-line" cx="180" cy="150" rx="74" ry="21"/>
        <ellipse class="g-line" cx="180" cy="116" rx="64" ry="18"/>
        <ellipse class="g-line" cx="180" cy="184" rx="64" ry="18"/>
        <ellipse class="g-line g-m g-m1" cx="180" cy="150" rx="74" ry="74"/>
        <ellipse class="g-line g-m g-m2" cx="180" cy="150" rx="74" ry="74"/>
        <ellipse class="g-line g-m g-m3" cx="180" cy="150" rx="74" ry="74"/>
        <circle class="g-station" cx="212" cy="124" r="3"/>
        <circle class="g-ring" cx="212" cy="124" r="3"/>
      </g>
      <g transform="rotate(-18 180 150)">
        <ellipse class="orbit-path" cx="180" cy="150" rx="152" ry="50"/>
        <g class="sat">
          <rect x="-5" y="-3" width="10" height="6" rx="1"/><rect x="-18" y="-2" width="11" height="4"/><rect x="7" y="-2" width="11" height="4"/>
          <animateMotion dur="7s" repeatCount="indefinite" path="M28 150a152 50 0 1 0 304 0a152 50 0 1 0 -304 0"/>
        </g>
      </g>
    </svg>
    <dl class="readouts mono">
      ${readout(t.orbit, 'LEO', 'orbit')}
      <div><dt>${t.signal}</dt><dd><span class="bars"><i></i><i></i><i></i><i></i></span></dd></div>
      ${readout(t.pkt, '042', 'pkt')}
    </dl>
  </div>`;
}

// Design C: a tiny ortholinear keyboard where keys tap in a diagonal wave over a PCB.
function keyboard(ui) {
  const rows = [
    ['{', '}', '(', ')', '[', ']', '<', '>', '/', '\\'],
    ['A', 'L', 'D', 'A', '_', '=', ';', ':', '?', '!'],
    ['+', '-', '*', '%', '&', '|', '^', '~', '@', '$'],
    ['esc', 'sft', 'ctl', 'alt', '␣', '␣', 'alt', 'ctl', 'sft', '↵'],
  ];
  const keys = rows
    .map((row, r) =>
      row
        .map((k, c) => {
          const hot = r === 1 && c < 4 ? ' hot' : '';
          return `<span class="k${hot}" style="--d:${r + c}">${k.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</span>`;
        })
        .join('')
    )
    .join('');
  return `<div class="art art-keys" data-art="keys" aria-hidden="true">
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
    <p class="art-cap mono">${ui.art.c}</p>
  </div>`;
}

export function heroArt(design, ui) {
  if (design === 'b') return orbit(ui);
  if (design === 'c') return keyboard(ui);
  return cansat(ui);
}
