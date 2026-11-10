/* Renders the page from config.js. No dependencies. */
(function () {
  'use strict';
  var C = window.SITE, ICONS = window.ICONS || {};
  var $ = function (id) { return document.getElementById(id); };
  var root = document.documentElement;

  var UI = {
    en: { enter: 'Enter', silent: 'Enter without sound', scroll: 'Scroll', about: 'About', copied: 'Email copied!', mute: 'Toggle sound',
          presence: { online: 'Online', idle: 'Idle', dnd: 'Do not disturb', offline: 'Offline' }, discord: 'Discord', nowPlaying: 'Now playing', email: 'Copy email' },
    vi: { enter: 'Vào trang', silent: 'Vào không nhạc', scroll: 'Cuộn xuống', about: 'Giới thiệu', copied: 'Đã sao chép email!', mute: 'Bật/tắt âm thanh',
          presence: { online: 'Trực tuyến', idle: 'Vắng mặt', dnd: 'Đừng làm phiền', offline: 'Ngoại tuyến' }, discord: 'Discord', nowPlaying: 'Đang phát', email: 'Sao chép email' }
  };
  var langs = (C.site.languages && C.site.languages.length) ? C.site.languages : [C.site.language || 'en'];
  var lang = pickLang();

  function pickLang() {
    var saved; try { saved = localStorage.getItem('lang'); } catch (e) {}
    if (saved && langs.indexOf(saved) > -1) return saved;
    return langs.indexOf(C.site.language) > -1 ? C.site.language : langs[0];
  }
  /* string or {en, vi} -> string */
  function L(v) {
    if (v == null) return '';
    if (typeof v === 'string') return v;
    return v[lang] || v.en || v[Object.keys(v)[0]] || '';
  }
  function T(k) { return (UI[lang] || UI.en)[k] || UI.en[k]; }
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function icon(name) {
    var d = ICONS[name];
    if (!d && name === 'link') d = 'M3.9 12a3.1 3.1 0 0 1 3.1-3.1h4V7H7a5 5 0 0 0 0 10h4v-1.9H7A3.1 3.1 0 0 1 3.9 12zM8 13h8v-2H8v2zm9-6h-4v1.9h4a3.1 3.1 0 0 1 0 6.2h-4V17h4a5 5 0 0 0 0-10z';
    if (!d && name === 'mail') d = 'M2 5.5A1.5 1.5 0 0 1 3.5 4h17A1.5 1.5 0 0 1 22 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-17A1.5 1.5 0 0 1 2 18.5v-13zm2.2.6 7.8 6.1 7.8-6.1H4.2zM20 7.9l-7.4 5.8a1 1 0 0 1-1.2 0L4 7.9v10.1h16V7.9z';
    if (!d && name === 'arrow') d = 'M7 17 17 7m0 0H8m9 0v9';
    if (name === 'arrow') return '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="' + d + '"/></svg>';
    return '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="' + (d || ICONS.github) + '"/></svg>';
  }
  function safeUrl(u) { return /^(https?:|mailto:|tel:|\/|\.|#|[\w-]+\/)/i.test(u || '') ? u : '#'; }

  /* ---------- appearance ---------- */
  function applyAppearance() {
    var a = C.appearance || {}, bg = $('bg');
    root.style.setProperty('--accent', a.accent || '#7c8cff');
    root.style.setProperty('--dim', a.backgroundDim != null ? a.backgroundDim : .55);
    if (a.cards === 'solid') document.body.classList.add('solid');
    var m = document.querySelector('meta[name=theme-color]');
    if (!m) { m = el('meta'); m.name = 'theme-color'; document.head.appendChild(m); }
    m.content = C.site.themeColor || '#0b0d12';
    if (!a.background) { bg.classList.add('gradient'); return; }
    if (/\.(mp4|webm)(\?|$)/i.test(a.background)) {
      var v = el('video'); v.src = a.background; v.autoplay = v.loop = v.muted = v.playsInline = true; v.setAttribute('muted', ''); bg.appendChild(v);
    } else {
      bg.style.backgroundImage = 'url("' + a.background.replace(/"/g, '%22') + '")';
    }
  }

  /* ---------- text that depends on language ---------- */
  var cleanups = [];
  function render() {
    root.lang = lang;
    var P = C.profile;
    document.title = C.site.title;
    $('name').textContent = P.name;
    $('tagline').textContent = L(P.tagline);
    $('avatar').src = P.avatar; $('avatar').alt = P.name;
    $('scroll-hint').firstElementChild.textContent = T('scroll');

    var meta = [];
    if (P.location) meta.push(esc(P.location));
    if (P.timezone) meta.push('<span id="clock"></span>');
    $('meta').innerHTML = meta.join(' · ');
    tick();

    var soc = $('social'); soc.innerHTML = '';
    (C.social || []).forEach(function (s) {
      var a = el('a', null, icon(s.icon)); a.href = safeUrl(s.url); a.target = '_blank'; a.rel = 'noopener noreferrer';
      a.title = a.ariaLabel = s.label || s.icon; soc.appendChild(a);
    });
    if (P.email) {
      var b = el('button', null, icon('mail')); b.type = 'button'; b.title = b.ariaLabel = T('email');
      b.onclick = function () {
        var done = function () { toast(T('copied')); };
        if (navigator.clipboard) navigator.clipboard.writeText(P.email).then(done, function () { location.href = 'mailto:' + P.email; });
        else location.href = 'mailto:' + P.email;
      };
      soc.appendChild(b);
    }

    $('enter-kicker').textContent = L((C.appearance || {}).introKicker);
    $('enter-btn').innerHTML = '<i><svg viewBox="0 0 16 16" width="10" height="10"><path d="M4 2.5v11l9-5.5z" fill="currentColor"/></svg></i><span>' + esc(T('enter')) + '</span>';
    $('enter-silent').textContent = T('silent');

    var seg = $('lang'); seg.innerHTML = ''; seg.hidden = langs.length < 2;
    langs.forEach(function (l) {
      var b = el('button', null, l.toUpperCase()); b.type = 'button'; b.setAttribute('aria-pressed', l === lang);
      b.onclick = function () { lang = l; try { localStorage.setItem('lang', l); } catch (e) {} render(); renderCards(); };
      seg.appendChild(b);
    });
  }

  function tick() {
    var c = $('clock'), tz = C.profile.timezone; if (!c || !tz) return;
    try { c.textContent = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: tz }).format(new Date()) + ' local'; } catch (e) { c.textContent = ''; }
  }
  setInterval(tick, 20000);

  /* ---------- cards ---------- */
  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: .12 }) : null;
  function addCard(node) { node.classList.add('reveal'); $('cards').appendChild(node); if (io) io.observe(node); else node.classList.add('in'); return node; }

  var presenceTimer;
  function renderCards() {
    var box = $('cards'); box.innerHTML = ''; clearInterval(presenceTimer);
    var P = C.profile, n;

    /* about */
    n = el('div', 'card');
    n.innerHTML = '<div class="badge">' + esc(T('about')) + '</div>' +
      (P.status && P.status.show ? '<div class="pill">' + esc(L(P.status.text)) + '</div>' : '') +
      '<p class="about-text">' + esc(L(P.about)) + '</p>';
    if (P.cta && P.cta.url) {
      var cta = el('a', 'btn', esc(L(P.cta.label)) + ' ' + icon('arrow')); cta.href = safeUrl(P.cta.url);
      if (/^https?:/i.test(P.cta.url)) { cta.target = '_blank'; cta.rel = 'noopener noreferrer'; }
      n.appendChild(cta);
    }
    addCard(n);

    /* projects */
    var items = (C.projects && C.projects.items) || [];
    if (items.length) {
      n = el('div', 'card'); n.appendChild(el('div', 'badge', esc(L(C.projects.title))));
      var ul = el('ul', 'proj');
      items.forEach(function (p) {
        var li = el('li'), a = el('a'); a.href = safeUrl(p.url); a.target = '_blank'; a.rel = 'noopener noreferrer';
        a.innerHTML = '<span class="tile">' + icon(p.icon || 'link') + '</span><span class="txt"><h3>' + esc(p.title) + '</h3><p>' + esc(L(p.description)) + '</p>' +
          ((p.tags && p.tags.length) ? '<div class="tags">' + p.tags.map(function (t) { return '<span>' + esc(t) + '</span>'; }).join('') + '</div>' : '') +
          '</span><span class="arrow">' + icon('arrow') + '</span>';
        li.appendChild(a); ul.appendChild(li);
      });
      n.appendChild(ul); addCard(n);
    }

    /* skills */
    var sk = (C.skills && C.skills.items) || [];
    if (sk.length) {
      n = el('div', 'card'); n.appendChild(el('div', 'badge', esc(L(C.skills.title))));
      n.appendChild(el('div', 'chips', sk.map(function (s) { return '<span>' + esc(s) + '</span>'; }).join(''))); addCard(n);
    }

    /* discord */
    if (C.discord && C.discord.enabled && /^\d{15,25}$/.test(C.discord.userId)) {
      n = el('div', 'card');
      n.innerHTML = '<div class="row"><div class="mini"><img id="dc-av" alt="" /><span id="dc-dot" class="dot"></span></div>' +
        '<div class="grow"><div class="label">' + esc(T('discord')) + '</div><div class="strong ellip" id="dc-name">' + esc(P.name) + '</div><div class="muted ellip" id="dc-line">…</div></div></div>';
      addCard(n); n.querySelector('#dc-av').src = P.avatar;
      var pull = function () {
        fetch('https://api.lanyard.rest/v1/users/' + C.discord.userId).then(function (r) { return r.json(); }).then(function (j) {
          if (!j.success) { n.querySelector('#dc-line').textContent = 'Join discord.gg/lanyard to enable'; return; }
          var d = j.data, st = d.discord_status || 'offline', act = (d.activities || []).filter(function (a) { return a.type !== 4; })[0], cs = (d.activities || []).filter(function (a) { return a.type === 4; })[0];
          n.querySelector('#dc-dot').className = 'dot ' + st;
          n.querySelector('#dc-name').textContent = d.discord_user.global_name || d.discord_user.username;
          n.querySelector('#dc-line').textContent = act ? act.name + (act.details ? ' — ' + act.details : '') : (cs && cs.state ? cs.state : T('presence')[st]);
          if (d.discord_user.avatar) n.querySelector('#dc-av').src = 'https://cdn.discordapp.com/avatars/' + d.discord_user.id + '/' + d.discord_user.avatar + '.png?size=128';
        }).catch(function () {});
      };
      pull(); presenceTimer = setInterval(pull, 30000);
    }

    /* music */
    if (audio) {
      n = el('div', 'card player');
      n.innerHTML = '<div class="row"><img class="cover" id="pl-cover" alt="" /><div class="grow"><div class="label">' + esc(T('nowPlaying')) + '</div>' +
        '<div class="strong ellip" id="pl-title"></div><div class="muted ellip" id="pl-artist"></div></div>' +
        '<div class="ctrls"><button type="button" id="pl-prev" aria-label="Previous">' + '<svg class="ic" viewBox="0 0 16 16"><path d="M3 2h2v12H3zm10 0v12L6 8z"/></svg></button>' +
        '<button type="button" class="play" id="pl-play" aria-label="Play/Pause"></button>' +
        '<button type="button" id="pl-next" aria-label="Next"><svg class="ic" viewBox="0 0 16 16"><path d="M11 2h2v12h-2zM3 2l7 6-7 6z"/></svg></button></div></div>' +
        '<div class="bar" id="pl-bar"><i id="pl-fill"></i></div>';
      addCard(n); wirePlayer(n);
    }

    /* footer */
    var f = C.footer || {};
    n = el('footer', 'card');
    n.innerHTML = '© ' + new Date().getFullYear() + ' ' + esc(P.name) + (f.text ? ' · ' + esc(L(f.text)) : '') +
      (f.showCredit !== false ? ' · <a href="https://github.com/amItuff/portfolio-template" target="_blank" rel="noopener noreferrer">portfolio-template</a>' : '');
    addCard(n);
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
    load(idx, false);
    pb.innerHTML = audio.paused ? PLAY : PAUSE;
    pb.onclick = function () { audio.paused ? audio.play().catch(function () {}) : audio.pause(); };
    n.querySelector('#pl-prev').onclick = function () { load(idx - 1, true); };
    n.querySelector('#pl-next').onclick = function () { load(idx + 1, true); };
    n.querySelector('#pl-bar').onclick = function (e) { var r = this.getBoundingClientRect(); if (audio.duration) audio.currentTime = audio.duration * (e.clientX - r.left) / r.width; };
    audio.onplay = audio.onpause = function () { pb.innerHTML = audio.paused ? PLAY : PAUSE; n.classList.toggle('playing', !audio.paused); syncMute(); };
    audio.ontimeupdate = function () { if (audio.duration) n.querySelector('#pl-fill').style.width = (audio.currentTime / audio.duration * 100) + '%'; };
    audio.onended = function () { load(idx + 1, true); };
  }
  var mute = $('mute');
  function syncMute() { if (!audio) return; mute.innerHTML = audio.paused ? '<svg class="ic" viewBox="0 0 16 16"><path d="M8 2 4 5.5H1v5h3L8 14zm3.3 2.7-1 1L12 8l-1.7 2.3 1 1L13 8.8z" opacity=".5"/></svg>' : '<svg class="ic" viewBox="0 0 16 16"><path d="M8 2 4 5.5H1v5h3L8 14zm2.5 2.5v1.3a2.7 2.7 0 0 1 0 4.4v1.3a4 4 0 0 0 0-7z"/></svg>'; }
  if (audio) { mute.hidden = false; mute.onclick = function () { audio.paused ? audio.play().catch(function () {}) : audio.pause(); }; syncMute(); }

  /* ---------- toast ---------- */
  var tt; function toast(msg) { var t = $('toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(tt); tt = setTimeout(function () { t.classList.remove('show'); }, 2200); }

  /* ---------- enter screen ---------- */
  function start() {
    document.body.classList.add('ready'); root.classList.remove('locked');
  }
  function setupEnter() {
    var e = $('enter');
    if (!(C.appearance || {}).intro) { e.remove(); start(); return; }
    e.hidden = false; root.classList.add('locked');
    var nm = $('enter-name'); nm.setAttribute('aria-label', C.profile.name);
    nm.innerHTML = C.profile.name.split('').map(function (ch, i) { return '<span aria-hidden="true" style="--i:' + i + '">' + esc(ch) + '</span>'; }).join('');
    var hasAudio = !!audio && M.autoplayOnEnter !== false;
    $('enter-silent').hidden = !hasAudio;
    function go(sound) {
      if (e.classList.contains('leaving')) return;
      if (sound && audio) audio.play().catch(function () {});
      e.classList.add('leaving'); start(); setTimeout(function () { e.remove(); }, 1200);
    }
    $('enter-btn').onclick = function (ev) { ev.stopPropagation(); go(hasAudio); };
    $('enter-silent').onclick = function (ev) { ev.stopPropagation(); go(false); };
    e.onclick = function () { go(hasAudio); };
    document.addEventListener('keydown', function k(ev) { if (ev.key === 'Enter' && document.body.contains(e)) { go(hasAudio); document.removeEventListener('keydown', k); } });
  }

  applyAppearance(); render(); renderCards(); setupEnter();
})();
