/* Renders the page from config.js. No dependencies. */
(function () {
  'use strict';
  var C = window.SITE, ICONS = window.ICONS || {}, THEMES = window.THEMES || {};
  var A = C.appearance || {};
  var $ = function (id) { return document.getElementById(id); };
  var root = document.documentElement;

  var UI = {
    en: { enter: 'Enter', silent: 'Enter without sound', scroll: 'Scroll', about: 'About', work: 'Work', stack: 'Stack', copied: 'Email copied', mute: 'Toggle sound',
          presence: { online: 'Online', idle: 'Idle', dnd: 'Do not disturb', offline: 'Offline' }, discord: 'Discord', nowPlaying: 'Now playing', email: 'Email', local: 'local time',
          theme: 'Theme', presets: 'Presets', colors: 'Colours', font: 'Headings', corners: 'Corners', copy: 'Copy config', reset: 'Reset', copiedCfg: 'Paste it into config.js → appearance',
          c: { accent: 'Accent', bg: 'Background', text: 'Text', surface: 'Boxes', muted: 'Muted', line: 'Lines' }, hint: 'Pick colours, copy the config, paste it into config.js.' },
    vi: { enter: 'Vào trang', silent: 'Vào không nhạc', scroll: 'Cuộn xuống', about: 'Giới thiệu', work: 'Dự án', stack: 'Công nghệ', copied: 'Đã sao chép email', mute: 'Bật/tắt âm thanh',
          presence: { online: 'Trực tuyến', idle: 'Vắng mặt', dnd: 'Đừng làm phiền', offline: 'Ngoại tuyến' }, discord: 'Discord', nowPlaying: 'Đang phát', email: 'Email', local: 'giờ địa phương',
          theme: 'Giao diện', presets: 'Mẫu có sẵn', colors: 'Màu sắc', font: 'Phông tiêu đề', corners: 'Bo góc', copy: 'Sao chép config', reset: 'Đặt lại', copiedCfg: 'Dán vào config.js → appearance',
          c: { accent: 'Màu nhấn', bg: 'Nền', text: 'Chữ', surface: 'Khung', muted: 'Chữ phụ', line: 'Đường kẻ' }, hint: 'Chọn màu, sao chép config rồi dán vào config.js.' }
  };
  var langs = (C.site.languages && C.site.languages.length) ? C.site.languages : [C.site.language || 'en'];
  var lang = pickLang();

  function pickLang() {
    var saved; try { saved = localStorage.getItem('lang'); } catch (e) {}
    if (saved && langs.indexOf(saved) > -1) return saved;
    return langs.indexOf(C.site.language) > -1 ? C.site.language : langs[0];
  }
  function L(v) { if (v == null) return ''; if (typeof v === 'string') return v; return v[lang] || v.en || v[Object.keys(v)[0]] || ''; }
  function T(k) { return (UI[lang] || UI.en)[k] || UI.en[k]; }
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  var PATHS = {
    link: 'M3.9 12a3.1 3.1 0 0 1 3.1-3.1h4V7H7a5 5 0 0 0 0 10h4v-1.9H7A3.1 3.1 0 0 1 3.9 12zM8 13h8v-2H8v2zm9-6h-4v1.9h4a3.1 3.1 0 0 1 0 6.2h-4V17h4a5 5 0 0 0 0-10z',
    mail: 'M2 5.5A1.5 1.5 0 0 1 3.5 4h17A1.5 1.5 0 0 1 22 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-17A1.5 1.5 0 0 1 2 18.5v-13zm2.2.6 7.8 6.1 7.8-6.1H4.2zM20 7.9l-7.4 5.8a1 1 0 0 1-1.2 0L4 7.9v10.1h16V7.9z',
    palette: 'M12 3a9 9 0 0 0 0 18c1.1 0 1.8-.9 1.5-1.9-.3-1 .4-2.1 1.5-2.1h2A4 4 0 0 0 21 11 9 9 0 0 0 12 3zM7.5 12a1.4 1.4 0 1 1 0-2.8 1.4 1.4 0 0 1 0 2.8zm3-4a1.4 1.4 0 1 1 0-2.8 1.4 1.4 0 0 1 0 2.8zm4 0a1.4 1.4 0 1 1 0-2.8 1.4 1.4 0 0 1 0 2.8zm3 4a1.4 1.4 0 1 1 0-2.8 1.4 1.4 0 0 1 0 2.8z'
  };
  function icon(name) { return '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="' + (ICONS[name] || PATHS[name] || ICONS.github) + '"/></svg>'; }
  function safeUrl(u) { return /^(https?:|mailto:|tel:|\/|\.|#|[\w-]+\/)/i.test(u || '') ? u : '#'; }

  /* ---------- theme ---------- */
  var KEYS = ['accent', 'bg', 'text', 'surface', 'muted', 'line'];
  var dark = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : { matches: false };
  var state = { theme: A.theme || 'auto', colors: Object.assign({}, A.colors || {}), font: A.displayFont || 'serif', corners: A.corners || 'sharp' };

  function resolveTheme(name) {
    if (name === 'auto') name = dark.matches ? (A.themeDark || 'ink') : (A.themeLight || 'paper');
    return THEMES[name] ? name : 'paper';
  }
  function currentColors() {
    var t = THEMES[resolveTheme(state.theme)], out = {};
    Object.keys(t).forEach(function (k) { out[k] = t[k]; });
    KEYS.concat(['accentInk']).forEach(function (k) { if (state.colors[k]) out[k] = state.colors[k]; });
    return out;
  }
  function lum(hex) { var m = /^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i.exec(hex); if (!m) return 0; return [1, 2, 3].map(function (i) { var c = parseInt(m[i], 16) / 255; return c <= .03928 ? c / 12.92 : Math.pow((c + .055) / 1.055, 2.4); }).reduce(function (s, c, i) { return s + c * [.2126, .7152, .0722][i]; }, 0); }
  function applyTheme() {
    var c = currentColors(), s = root.style;
    s.setProperty('--bg', c.bg); s.setProperty('--surface', c.surface); s.setProperty('--text', c.text); s.setProperty('--muted', c.muted);
    s.setProperty('--line', c.line); s.setProperty('--accent', c.accent);
    s.setProperty('--accent-ink', state.colors.accentInk || (lum(c.accent) > .4 ? '#111111' : '#ffffff'));
    root.dataset.mode = lum(c.bg) < .3 ? 'dark' : 'light';
    var m = document.querySelector('meta[name=theme-color]'); if (!m) { m = el('meta'); m.name = 'theme-color'; document.head.appendChild(m); } m.content = c.bg;
    var f = c.mono && state.font === 'serif' ? 'mono' : state.font;
    s.setProperty('--display', 'var(--' + (f === 'sans' ? 'sans' : f === 'mono' ? 'mono' : 'serif') + ')');
    document.body.classList.toggle('sans-font', f === 'sans'); document.body.classList.toggle('mono-font', f === 'mono');
    s.setProperty('--r', state.corners === 'round' ? '14px' : '2px');
  }
  if (dark.addEventListener) dark.addEventListener('change', function () { if (state.theme === 'auto') { applyTheme(); syncStudio(); } });

  function applyBackground() {
    var bg = $('bg'), url = A.background;
    root.style.setProperty('--dim', A.backgroundDim != null ? A.backgroundDim : .6);
    if (!url) { bg.classList.add('plain'); $('bg-dim').classList.add('off'); return; }
    if (/\.(mp4|webm)(\?|$)/i.test(url)) { var v = el('video'); v.src = url; v.autoplay = v.loop = v.muted = v.playsInline = true; v.setAttribute('muted', ''); bg.appendChild(v); }
    else bg.style.backgroundImage = 'url("' + url.replace(/"/g, '%22') + '")';
  }

  /* ---------- header / language-dependent text ---------- */
  function render() {
    root.lang = lang;
    var P = C.profile;
    document.title = C.site.title;
    var words = String(P.name).trim().split(/\s+/), last = words.length > 1 ? words.pop() : null;
    $('name').innerHTML = esc(words.join(' ')) + (last ? ' <em>' + esc(last) + '</em>' : '');
    $('tagline').textContent = L(P.tagline);
    $('avatar').src = P.avatar; $('avatar').alt = P.name;
    $('scroll-hint').textContent = T('scroll');

    var meta = [];
    if (P.status && P.status.show) meta.push('<span class="live">' + esc(L(P.status.text)) + '</span>');
    if (P.location) meta.push('<span>' + esc(P.location) + '</span>');
    if (P.timezone) meta.push('<span id="clock"></span>');
    $('meta').innerHTML = meta.join('');
    tick();

    var soc = $('social'); soc.innerHTML = '';
    (C.social || []).forEach(function (s) {
      var a = el('a', null, icon(s.icon) + '<span>' + esc(s.label || s.icon) + '</span>'); a.href = safeUrl(s.url); a.target = '_blank'; a.rel = 'noopener noreferrer'; soc.appendChild(a);
    });
    if (P.email) {
      var b = el('button', null, icon('mail') + '<span>' + esc(T('email')) + '</span>'); b.type = 'button';
      b.onclick = function () {
        if (navigator.clipboard) navigator.clipboard.writeText(P.email).then(function () { toast(T('copied')); }, function () { location.href = 'mailto:' + P.email; });
        else location.href = 'mailto:' + P.email;
      };
      soc.appendChild(b);
    }

    if ($('enter-kicker')) {
      $('enter-kicker').textContent = L(A.introKicker);
      $('enter-btn').innerHTML = '<span>' + esc(T('enter')) + '</span><span aria-hidden="true">→</span>';
      $('enter-silent').textContent = T('silent');
    }

    var seg = $('lang'); seg.innerHTML = ''; seg.hidden = langs.length < 2;
    langs.forEach(function (l) {
      var b = el('button', null, l.toUpperCase()); b.type = 'button'; b.setAttribute('aria-pressed', l === lang);
      b.onclick = function () { lang = l; try { localStorage.setItem('lang', l); } catch (e) {} render(); renderCards(); buildStudio(); };
      seg.appendChild(b);
    });
  }
  function tick() {
    var c = $('clock'), tz = C.profile.timezone; if (!c || !tz) return;
    try { c.textContent = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: tz }).format(new Date()) + ' ' + T('local'); } catch (e) { c.textContent = ''; }
  }
  setInterval(tick, 20000);

  /* ---------- sections ---------- */
  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: .1 }) : null;
  function add(node) { node.classList.add('reveal'); $('cards').appendChild(node); if (io) io.observe(node); else node.classList.add('in'); return node; }
  function section(num, title, inner) { var s = el('section', 'sec'); s.innerHTML = '<div class="sec-h"><span>' + num + '</span>' + esc(title) + '</div>'; if (inner) s.appendChild(inner); return s; }
  function pad(n) { return (n < 10 ? '0' : '') + n; }

  var presenceTimer;
  function renderCards() {
    $('cards').innerHTML = ''; clearInterval(presenceTimer);
    var P = C.profile, n = 0, box, w;

    w = el('div'); w.appendChild(el('p', 'about', esc(L(P.about))));
    if (P.cta && P.cta.url) {
      var cta = el('a', 'btn', '<span>' + esc(L(P.cta.label)) + '</span><span aria-hidden="true">↗</span>'); cta.href = safeUrl(P.cta.url);
      if (/^https?:/i.test(P.cta.url)) { cta.target = '_blank'; cta.rel = 'noopener noreferrer'; }
      w.appendChild(cta);
    }
    add(section(pad(++n), T('about'), w));

    var items = (C.projects && C.projects.items) || [];
    if (items.length) {
      var ul = el('ul', 'work');
      items.forEach(function (p, i) {
        var li = el('li'), a = el('a'); a.href = safeUrl(p.url); a.target = '_blank'; a.rel = 'noopener noreferrer';
        a.innerHTML = '<span class="n">' + pad(i + 1) + '</span><h3>' + esc(p.title) + '</h3><span class="go" aria-hidden="true">↗</span><p>' + esc(L(p.description)) + '</p>' +
          ((p.tags && p.tags.length) ? '<div class="tags">' + p.tags.map(function (t) { return '<span>' + esc(t) + '</span>'; }).join('') + '</div>' : '');
        li.appendChild(a); ul.appendChild(li);
      });
      add(section(pad(++n), L(C.projects.title) || T('work'), ul));
    }

    var sk = (C.skills && C.skills.items) || [];
    if (sk.length) add(section(pad(++n), L(C.skills.title) || T('stack'), el('div', 'chips', sk.map(function (s) { return '<span>' + esc(s) + '</span>'; }).join(''))));

    if (C.discord && C.discord.enabled && /^\d{15,25}$/.test(C.discord.userId)) {
      box = el('div', 'box');
      box.innerHTML = '<div class="row"><div class="mini"><img id="dc-av" alt="" /><span id="dc-dot" class="dot"></span></div>' +
        '<div class="grow"><div class="label">' + esc(T('discord')) + '</div><div class="strong ellip" id="dc-name">' + esc(P.name) + '</div><div class="muted ellip" id="dc-line">…</div></div></div>';
      add(section(pad(++n), T('discord'), box)); box.querySelector('#dc-av').src = P.avatar;
      var pull = function () {
        fetch('https://api.lanyard.rest/v1/users/' + C.discord.userId).then(function (r) { return r.json(); }).then(function (j) {
          if (!j.success) { box.querySelector('#dc-line').textContent = 'Join discord.gg/lanyard to enable'; return; }
          var d = j.data, st = d.discord_status || 'offline', act = (d.activities || []).filter(function (a) { return a.type !== 4; })[0], cs = (d.activities || []).filter(function (a) { return a.type === 4; })[0];
          box.querySelector('#dc-dot').className = 'dot ' + st;
          box.querySelector('#dc-name').textContent = d.discord_user.global_name || d.discord_user.username;
          box.querySelector('#dc-line').textContent = act ? act.name + (act.details ? ' — ' + act.details : '') : (cs && cs.state ? cs.state : T('presence')[st]);
          if (d.discord_user.avatar) box.querySelector('#dc-av').src = 'https://cdn.discordapp.com/avatars/' + d.discord_user.id + '/' + d.discord_user.avatar + '.png?size=128';
        }).catch(function () {});
      };
      pull(); presenceTimer = setInterval(pull, 30000);
    }

    if (audio) {
      box = el('div', 'box player');
      box.innerHTML = '<div class="row"><img class="cover" id="pl-cover" alt="" /><div class="grow"><div class="label">' + esc(T('nowPlaying')) + '</div>' +
        '<div class="strong ellip" id="pl-title"></div><div class="muted ellip" id="pl-artist"></div></div>' +
        '<div class="ctrls"><button type="button" id="pl-prev" aria-label="Previous"><svg class="ic" viewBox="0 0 16 16"><path d="M3 2h2v12H3zm10 0v12L6 8z"/></svg></button>' +
        '<button type="button" class="play" id="pl-play" aria-label="Play/Pause"></button>' +
        '<button type="button" id="pl-next" aria-label="Next"><svg class="ic" viewBox="0 0 16 16"><path d="M11 2h2v12h-2zM3 2l7 6-7 6z"/></svg></button></div></div>' +
        '<div class="bar" id="pl-bar"><i id="pl-fill"></i></div>';
      add(section(pad(++n), 'Music', box)); wirePlayer(box);
    }

    var f = C.footer || {}, ft = el('footer', 'foot');
    ft.innerHTML = '<span>© ' + new Date().getFullYear() + ' ' + esc(P.name) + (f.text ? ' · ' + esc(L(f.text)) : '') + '</span>' +
      (f.showCredit !== false ? '<a href="https://github.com/amItuff/portfolio-template" target="_blank" rel="noopener noreferrer">portfolio-template</a>' : '');
    add(ft);
  }

  /* ---------- music ---------- */
  var M = C.music || {}, audio = null, idx = 0;
  if (M.enabled && M.tracks && M.tracks.length) { audio = new Audio(); audio.volume = M.volume != null ? M.volume : .6; audio.preload = 'none'; }
  var PLAY = '<svg class="ic" viewBox="0 0 16 16"><path d="M4 2.5v11l9-5.5z"/></svg>', PAUSE = '<svg class="ic" viewBox="0 0 16 16"><path d="M3 2h4v12H3zm6 0h4v12H9z"/></svg>';
  function wirePlayer(n) {
    var pb = n.querySelector('#pl-play');
    function load(i, go) {
      idx = (i + M.tracks.length) % M.tracks.length; var t = M.tracks[idx];
      audio.src = t.src; n.querySelector('#pl-title').textContent = t.title || ''; n.querySelector('#pl-artist').textContent = t.artist || '';
      n.querySelector('#pl-cover').src = t.cover || C.profile.avatar; if (go) audio.play().catch(function () {});
    }
    load(idx, false); pb.innerHTML = audio.paused ? PLAY : PAUSE;
    pb.onclick = function () { audio.paused ? audio.play().catch(function () {}) : audio.pause(); };
    n.querySelector('#pl-prev').onclick = function () { load(idx - 1, true); };
    n.querySelector('#pl-next').onclick = function () { load(idx + 1, true); };
    n.querySelector('#pl-bar').onclick = function (e) { var r = this.getBoundingClientRect(); if (audio.duration) audio.currentTime = audio.duration * (e.clientX - r.left) / r.width; };
    audio.onplay = audio.onpause = function () { pb.innerHTML = audio.paused ? PLAY : PAUSE; syncMute(); };
    audio.ontimeupdate = function () { if (audio.duration) n.querySelector('#pl-fill').style.width = (audio.currentTime / audio.duration * 100) + '%'; };
    audio.onended = function () { load(idx + 1, true); };
  }
  var mute = $('mute');
  function syncMute() { if (audio) mute.innerHTML = audio.paused ? '<svg class="ic" viewBox="0 0 16 16"><path d="M8 2 4 5.5H1v5h3L8 14zm3.3 2.7-1 1L12 8l-1.7 2.3 1 1L13 8.8z" opacity=".5"/></svg>' : '<svg class="ic" viewBox="0 0 16 16"><path d="M8 2 4 5.5H1v5h3L8 14zm2.5 2.5v1.3a2.7 2.7 0 0 1 0 4.4v1.3a4 4 0 0 0 0-7z"/></svg>'; }
  if (audio) { mute.hidden = false; mute.onclick = function () { audio.paused ? audio.play().catch(function () {}) : audio.pause(); }; syncMute(); }

  /* ---------- theme studio ---------- */
  var studio = $('studio'), sbtn = $('studio-btn');
  function buildStudio() {
    if (A.themePicker === false) return;
    sbtn.hidden = false; sbtn.innerHTML = icon('palette'); sbtn.title = T('theme');
    var cur = resolveTheme(state.theme), c = currentColors();
    var h = '<h4>' + esc(T('presets')) + '</h4><div class="presets">' +
      '<button class="preset" type="button" data-theme="auto" aria-pressed="' + (state.theme === 'auto') + '"><i style="background:linear-gradient(90deg,' + THEMES[A.themeLight || 'paper'].bg + ' 50%,' + THEMES[A.themeDark || 'ink'].bg + ' 50%);--c:' + THEMES[A.themeLight || 'paper'].accent + '"></i>Auto</button>' +
      Object.keys(THEMES).map(function (k) { var t = THEMES[k]; return '<button class="preset" type="button" data-theme="' + k + '" aria-pressed="' + (state.theme === k) + '"><i style="background:' + t.bg + ';--c:' + t.accent + '"></i>' + esc(t.label) + '</button>'; }).join('') +
      '</div><h4>' + esc(T('colors')) + '</h4><div class="colors">' +
      KEYS.map(function (k) { return '<label><input type="color" data-key="' + k + '" value="' + c[k] + '" />' + esc(T('c')[k]) + '</label>'; }).join('') +
      '</div><h4>' + esc(T('font')) + '</h4><div class="opt" data-opt="font">' +
      ['serif', 'sans', 'mono'].map(function (f) { return '<button type="button" data-v="' + f + '" aria-pressed="' + (state.font === f) + '">' + f + '</button>'; }).join('') +
      '</div><h4>' + esc(T('corners')) + '</h4><div class="opt" data-opt="corners">' +
      ['sharp', 'round'].map(function (f) { return '<button type="button" data-v="' + f + '" aria-pressed="' + (state.corners === f) + '">' + f + '</button>'; }).join('') +
      '</div><div class="actions"><button type="button" id="st-copy">' + esc(T('copy')) + '</button><button type="button" class="ghost" id="st-reset">' + esc(T('reset')) + '</button></div><small>' + esc(T('hint')) + '</small>';
    studio.innerHTML = h; void cur;
    studio.querySelectorAll('.preset').forEach(function (b) { b.onclick = function () { state.theme = b.dataset.theme; state.colors = {}; applyTheme(); buildStudio(); }; });
    studio.querySelectorAll('input[type=color]').forEach(function (i) { i.oninput = function () { state.colors[i.dataset.key] = i.value; if (i.dataset.key === 'accent') delete state.colors.accentInk; applyTheme(); }; });
    studio.querySelectorAll('[data-opt]').forEach(function (g) { g.querySelectorAll('button').forEach(function (b) { b.onclick = function () { state[g.dataset.opt] = b.dataset.v; applyTheme(); buildStudio(); }; }); });
    $('st-reset').onclick = function () { state = { theme: A.theme || 'auto', colors: Object.assign({}, A.colors || {}), font: A.displayFont || 'serif', corners: A.corners || 'sharp' }; applyTheme(); buildStudio(); };
    $('st-copy').onclick = function () {
      var base = THEMES[resolveTheme(state.theme)], over = [];
      KEYS.forEach(function (k) { if (state.colors[k] && state.colors[k].toLowerCase() !== String(base[k]).toLowerCase()) over.push('      ' + k + ': "' + state.colors[k] + '",'); });
      var txt = '    theme: "' + state.theme + '",\n    colors: {' + (over.length ? '\n' + over.join('\n') + '\n    ' : '') + '},\n    displayFont: "' + state.font + '",\n    corners: "' + state.corners + '",';
      var done = function () { toast(T('copiedCfg')); };
      if (navigator.clipboard) navigator.clipboard.writeText(txt).then(done, function () { window.prompt('Copy:', txt); }); else window.prompt('Copy:', txt);
    };
  }
  function syncStudio() { if (!studio.hidden) buildStudio(); }
  sbtn.onclick = function () { studio.hidden = !studio.hidden; sbtn.setAttribute('aria-expanded', !studio.hidden); if (!studio.hidden) buildStudio(); };
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !studio.hidden) sbtn.click(); });

  /* ---------- toast + enter ---------- */
  var tt; function toast(msg) { var t = $('toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(tt); tt = setTimeout(function () { t.classList.remove('show'); }, 2400); }
  function start() { document.body.classList.add('ready'); root.classList.remove('locked'); }
  function setupEnter() {
    var e = $('enter');
    if (!A.intro) { e.remove(); start(); return; }
    e.hidden = false; root.classList.add('locked');
    var nm = $('enter-name'); nm.setAttribute('aria-label', C.profile.name);
    nm.innerHTML = C.profile.name.split('').map(function (ch, i) { return '<span aria-hidden="true" style="--i:' + i + '">' + esc(ch) + '</span>'; }).join('');
    var sound = !!audio && M.autoplayOnEnter !== false;
    $('enter-silent').hidden = !sound;
    function go(withSound) {
      if (e.classList.contains('leaving')) return;
      if (withSound && audio) audio.play().catch(function () {});
      e.classList.add('leaving'); start(); setTimeout(function () { e.remove(); }, 1100);
    }
    $('enter-btn').onclick = function (ev) { ev.stopPropagation(); go(sound); };
    $('enter-silent').onclick = function (ev) { ev.stopPropagation(); go(false); };
    e.onclick = function () { go(sound); };
    document.addEventListener('keydown', function k(ev) { if (ev.key === 'Enter' && document.body.contains(e)) { go(sound); document.removeEventListener('keydown', k); } });
  }

  applyTheme(); applyBackground(); render(); renderCards(); buildStudio(); setupEnter();
})();
