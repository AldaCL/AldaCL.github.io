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

  // Remember an explicit language choice so the root page stops auto-redirecting
  var langLink = document.querySelector('.lang');
  if (langLink) {
    langLink.addEventListener('click', function () { store.set('lang', langLink.getAttribute('data-lang')); });
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
