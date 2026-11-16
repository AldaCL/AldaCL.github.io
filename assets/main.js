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

  // Easter egg: type 6 then 0 (anywhere outside a form field) to confirm 60% supremacy
  var eggBox = document.querySelector('[data-egg]');
  if (eggBox) {
    var toast = document.createElement('div');
    toast.className = 'toast'; toast.setAttribute('role', 'status');
    document.body.appendChild(toast);
    var lastSix = 0, hideT;
    document.addEventListener('keydown', function (ev) {
      if (ev.metaKey || ev.ctrlKey || ev.altKey) return;
      var tag = (ev.target && ev.target.tagName) || '';
      if (/^(INPUT|TEXTAREA|SELECT)$/.test(tag)) return;
      if (ev.key === '6') { lastSix = Date.now(); return; }
      if (ev.key === '0' && Date.now() - lastSix < 1500) {
        lastSix = 0;
        toast.textContent = eggBox.getAttribute('data-egg');
        toast.classList.add('show');
        var art = document.querySelector('.art');
        if (art && !reduced) { art.classList.remove('party'); void art.offsetWidth; art.classList.add('party'); }
        clearTimeout(hideT);
        hideT = setTimeout(function () { toast.classList.remove('show'); }, 4500);
      }
    });
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
        ? 'Si estás leyendo esto, probablemente deberíamos platicar. Por cierto: intenta teclear 60.'
        : 'If you are reading this, we should probably talk. Also: try typing 60.'),
      'font:700 14px ui-monospace,monospace;color:#3ddc97', 'font:14px ui-monospace,monospace'
    );
  } catch (e) { /* no console */ }
})();
