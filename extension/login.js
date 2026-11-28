(() => {
  'use strict';

  // Tela de login da Huggy (classes LoginFrameContent_*). Este script só faz alguma coisa quando ela existe:
  //  - interruptor de tema (claro/escuro) no canto superior direito
  //  - card "Novidades da extensão" no painel esquerdo, com o histórico de changelog.js
  const THEME_KEY = 'hg-theme';
  const FOLD_KEY = 'hg-changelog-folded';
  const LOGIN_SEL = '[class*="LoginFrameContent_main"]';

  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (_) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (_) {} },
  };

  const currentTheme = () => (document.documentElement.getAttribute('data-hg-theme') === 'dark' ? 'dark' : 'light');
  const applyTheme = (t) => document.documentElement.setAttribute('data-hg-theme', t);

  const el = (tag, cls, text) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  };

  const SUN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
  const MOON = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';
  const SPARK = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l1.9 5.6L19.5 9.5l-5.6 1.9L12 17l-1.9-5.6L4.5 9.5l5.6-1.9L12 2zm7 11l.9 2.6 2.6.9-2.6.9L19 20l-.9-2.6-2.6-.9 2.6-.9L19 13z"/></svg>';
  const CHEVRON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 15l6-6 6 6"/></svg>';
  const EXTERNAL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M9 7h8v8"/></svg>';

  // ---------- interruptor de tema ----------
  function buildTools() {
    const wrap = el('div', 'hg-login-tools');
    const btn = el('button', 'hg-theme-switch');
    btn.type = 'button';
    btn.setAttribute('role', 'switch');
    btn.setAttribute('aria-label', 'Modo escuro');
    btn.innerHTML = `<span class="hg-ts-ico hg-ts-sun">${SUN}</span><span class="hg-ts-ico hg-ts-moon">${MOON}</span><span class="hg-ts-thumb"></span>`;
    const sync = () => {
      const dark = currentTheme() === 'dark';
      btn.setAttribute('aria-checked', String(dark));
      btn.title = dark ? 'Modo escuro (clique para o claro)' : 'Modo claro (clique para o escuro)';
    };
    btn.addEventListener('click', () => {
      const next = currentTheme() === 'dark' ? 'light' : 'dark';
      store.set(THEME_KEY, next);
      applyTheme(next);
      sync();
    });
    sync();
    wrap.appendChild(btn);
    return wrap;
  }

  // ---------- card de changelog ----------
  function versionOf(entry) { return entry.version || ''; }

  function formatDate(iso) {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || '');
    return m ? `${m[3]}/${m[2]}/${m[1]}` : (iso || '');
  }

  function buildEntry(entry) {
    const box = el('div', 'hg-cl-entry');
    const head = el('div', 'hg-cl-entry-head');
    head.appendChild(el('span', 'hg-cl-ver', 'v' + versionOf(entry)));
    head.appendChild(el('strong', 'hg-cl-title', entry.title || ''));
    if (entry.date) head.appendChild(el('span', 'hg-cl-date', formatDate(entry.date)));
    box.appendChild(head);
    const ul = el('ul', 'hg-cl-list');
    (entry.items || []).forEach((t) => ul.appendChild(el('li', null, t)));
    box.appendChild(ul);
    return box;
  }

  function buildChangelog() {
    const data = Array.isArray(window.HG_CHANGELOG) ? window.HG_CHANGELOG : [];
    if (!data.length) return null;

    let installed = '';
    try { installed = chrome.runtime.getManifest().version || ''; } catch (_) {}

    const card = el('aside', 'hg-changelog');
    if (store.get(FOLD_KEY) === '1') card.classList.add('is-folded');

    // cabeçalho (clicável para recolher/expandir)
    const head = el('button', 'hg-cl-head');
    head.type = 'button';
    head.setAttribute('aria-expanded', String(!card.classList.contains('is-folded')));
    const ico = el('span', 'hg-cl-ico'); ico.innerHTML = SPARK;
    const ttl = el('span', 'hg-cl-headtext');
    ttl.appendChild(el('strong', null, 'Novidades da extensão'));
    ttl.appendChild(el('small', null, installed ? 'Versão instalada: ' + installed : 'Huggy Modern UI'));
    const badge = el('span', 'hg-cl-badge', 'NOVO');
    const chev = el('span', 'hg-cl-chev'); chev.innerHTML = CHEVRON;
    head.append(ico, ttl, badge, chev);
    head.addEventListener('click', () => {
      const folded = card.classList.toggle('is-folded');
      head.setAttribute('aria-expanded', String(!folded));
      store.set(FOLD_KEY, folded ? '1' : '0');
    });
    card.appendChild(head);

    // corpo: versão mais recente em destaque + anteriores recolhidas
    const body = el('div', 'hg-cl-body');
    body.appendChild(buildEntry(data[0]));
    if (data.length > 1) {
      const older = el('details', 'hg-cl-older');
      older.appendChild(el('summary', null, `Versões anteriores (${data.length - 1})`));
      data.slice(1).forEach((e) => older.appendChild(buildEntry(e)));
      body.appendChild(older);
    }
    if (window.HG_CHANGELOG_URL) {
      const a = el('a', 'hg-cl-link');
      a.href = window.HG_CHANGELOG_URL;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.innerHTML = 'Ver histórico completo <span class="hg-cl-ext"></span>';
      a.querySelector('.hg-cl-ext').innerHTML = EXTERNAL;
      body.appendChild(a);
    }
    card.appendChild(body);
    return card;
  }

  // ---------- ciclo de vida ----------
  function ensure() {
    const onLogin = !!document.querySelector(LOGIN_SEL);
    const tools = document.querySelector('.hg-login-tools');
    const log = document.querySelector('.hg-changelog');
    if (!onLogin) {            // saiu da tela de login (a Huggy é uma SPA): limpa o que adicionamos
      tools?.remove();
      log?.remove();
      return;
    }
    if (!tools) document.body.appendChild(buildTools());
    if (!log) {
      const c = buildChangelog();
      if (c) document.body.appendChild(c);
    }
  }

  let queued = false;
  const schedule = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => { queued = false; ensure(); });
  };
  new MutationObserver(schedule).observe(document.documentElement, { childList: true, subtree: true });
  schedule();

  // mantém várias abas sincronizadas
  window.addEventListener('storage', (e) => {
    if (e.key !== THEME_KEY) return;
    const t = store.get(THEME_KEY);
    if (t === 'dark' || t === 'light') applyTheme(t);
    const sw = document.querySelector('.hg-login-tools .hg-theme-switch');
    if (sw) sw.setAttribute('aria-checked', String(currentTheme() === 'dark'));
  });
})();
