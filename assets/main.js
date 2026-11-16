(function () {
  'use strict';
  var root = document.documentElement;
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) { /* storage can be blocked */ } }
  };

  // Theme toggle
  var themeBtn = document.querySelector('.theme');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      store.set('theme', next);
    });
  }

  // Project filters (progressive enhancement: without JS every project shows)
  var filters = document.querySelector('.filters');
  if (filters) {
    filters.hidden = false;
    var cards = document.querySelectorAll('.project');
    filters.addEventListener('click', function (ev) {
      var btn = ev.target.closest('.filter');
      if (!btn) return;
      var f = btn.getAttribute('data-filter');
      filters.querySelectorAll('.filter').forEach(function (b) {
        b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
      });
      cards.forEach(function (c) {
        var tags = (c.getAttribute('data-tags') || '').split(' ');
        c.hidden = !(f === 'all' || tags.indexOf(f) !== -1);
      });
    });
  }

  // Keycaps: press the matching physical key and the keycap presses too
  var caps = {};
  document.querySelectorAll('.keycap').forEach(function (el) {
    caps[el.getAttribute('data-key')] = el;
    el.addEventListener('pointerdown', function () {
      el.classList.add('pressed');
      setTimeout(function () { el.classList.remove('pressed'); }, 140);
    });
  });
  function onKey(down) {
    return function (ev) {
      if (ev.metaKey || ev.ctrlKey || ev.altKey) return;
      var el = caps[(ev.key || '').toUpperCase()];
      if (el) el.classList[down ? 'add' : 'remove']('pressed');
    };
  }
  document.addEventListener('keydown', onKey(true));
  document.addEventListener('keyup', onKey(false));


  var reduced = false;
  try { reduced = matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { /* old browser */ }
  var T = {
    en: { landed: 'LANDED', descending: 'DESCENT' },
    es: { landed: 'ATERRIZADO', descending: 'DESCENSO' }
  }[root.lang === 'es' ? 'es' : 'en'];
  function pad(n, w) { n = String(n); while (n.length < w) n = '0' + n; return n; }

  // SMIL animations (orbiting satellite) ignore prefers-reduced-motion, so pause them explicitly
  if (reduced) {
    document.querySelectorAll('svg').forEach(function (svg) { if (svg.pauseAnimations) svg.pauseAnimations(); });
  }

  // Scroll reveal: tag elements, then fade them in as they enter the viewport
  if (!reduced && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    document.querySelectorAll('.section-head, .card, .stack-row, .contact-list li').forEach(function (el, i) {
      el.setAttribute('data-reveal', '');
      el.style.transitionDelay = (i % 3) * 60 + 'ms';
      io.observe(el);
    });
  }

  // Design A: the CanSat drifts down under its parachute while simulated telemetry ticks
  var cs = document.querySelector('[data-art="cansat"]');
  if (cs) {
    var sat = cs.querySelector('.cs-sat');
    var r = {};
    cs.querySelectorAll('[data-r]').forEach(function (el) { r[el.getAttribute('data-r')] = el; });
    var PERIOD = 7000, TOP = 14, BOTTOM = 160, ALT = 700, lastText = 0;
    var draw = function (now) {
      var t = (now % PERIOD) / PERIOD;
      var fall = Math.min(t / 0.9, 1);                    // 90% descending, 10% sitting on the ground
      var y = TOP + (BOTTOM - TOP) * fall;
      var sway = fall < 1 ? Math.sin(now / 380) * 3.4 : 0;
      var fade = t < 0.04 ? t / 0.04 : (t > 0.97 ? (1 - t) / 0.03 : 1);
      sat.setAttribute('transform', 'translate(0 ' + y.toFixed(1) + ') rotate(' + sway.toFixed(2) + ' 160 6)');
      sat.style.opacity = fade.toFixed(2);
      if (now - lastText < 90 && !reduced) return;
      lastText = now;
      var alt = Math.round(ALT * (1 - fall));
      var landed = fall >= 1;
      if (r.alt) r.alt.textContent = alt + ' m';
      if (r.vel) r.vel.textContent = (landed ? 0 : 7.6 + Math.sin(now / 500) * 0.9).toFixed(1) + ' m/s';
      if (r.temp) r.temp.textContent = (24 - 6 * (alt / ALT) + Math.sin(now / 900) * 0.15).toFixed(1) + ' °C';
      if (r.pkt) r.pkt.textContent = pad(Math.floor(now / 500) % 1000, 3);
      if (r.state) r.state.textContent = landed ? T.landed : T.descending;
    };
    if (reduced) { draw(PERIOD * 0.45); }
    else {
      var loop = function (now) { draw(now); requestAnimationFrame(loop); };
      requestAnimationFrame(loop);
    }
  }

  // Design B: mission clock and packet counter
  var clock = document.querySelector('[data-clock]');
  if (clock && !reduced) {
    var t0 = Date.now(), prefix = clock.textContent.split(' ')[0];
    var pk = document.querySelector('.art-orbit [data-r="pkt"]');
    setInterval(function () {
      var s = Math.floor((Date.now() - t0) / 1000);
      clock.textContent = prefix + ' ' + pad(Math.floor(s / 3600), 2) + ':' + pad(Math.floor(s / 60) % 60, 2) + ':' + pad(s % 60, 2);
      if (pk) pk.textContent = pad(42 + s * 3, 3);
    }, 1000);
  }

  // Keyboards section: the keycaps type their own name until the visitor takes over
  var capList = Array.prototype.slice.call(document.querySelectorAll('.keycap'));
  var kbBox = document.querySelector('.kb-keys');
  if (capList.length && kbBox && !reduced && 'IntersectionObserver' in window) {
    var auto = true, visible = false, step = 0;
    var stop = function () { auto = false; };
    document.addEventListener('keydown', stop, { once: true });
    kbBox.addEventListener('pointerdown', stop, { once: true });
    new IntersectionObserver(function (e) { visible = e[0].isIntersecting; }).observe(kbBox);
    setInterval(function () {
      if (!auto || !visible) return;
      var el = capList[step % (capList.length + 4)];   // a short pause between words
      step++;
      if (!el) return;
      el.classList.add('pressed');
      setTimeout(function () { el.classList.remove('pressed'); }, 110);
    }, 150);
  }

  // Console easter egg
  var es = root.lang === 'es';
  try {
    console.log(
      '%c~/alda_%c ' + (es
        ? 'Si estás leyendo esto, probablemente deberíamos platicar.'
        : 'If you are reading this, we should probably talk.'),
      'font:700 14px ui-monospace,monospace;color:#3ddc97', 'font:14px ui-monospace,monospace'
    );
  } catch (e) { /* no console */ }
})();
