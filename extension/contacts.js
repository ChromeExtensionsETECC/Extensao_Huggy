(() => {
  'use strict';

  const KEY = 'hg-contacts-prefs';
  const defaults = { view: 'table', hideBlank: false };
  let prefs = { ...defaults };
  try { prefs = { ...defaults, ...JSON.parse(localStorage.getItem(KEY) || '{}') }; } catch (_) {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(prefs)); } catch (_) {} };

  const svg = (inner) =>
    `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;
  const ICON_TABLE = svg('<path d="M4 6h16M4 12h16M4 18h16"/>');
  const ICON_CARDS = svg('<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>');

  // Tabela de "Pessoas" = a que tem a coluna "Botão 'Iniciar chat'"
  function findPeopleTable() {
    for (const t of document.querySelectorAll('table')) {
      const ths = [...t.querySelectorAll('thead th')].map((th) => th.textContent.trim());
      if (ths.includes('Nome') && ths.some((x) => x.startsWith('Botão'))) return t;
    }
    return null;
  }

  function buildControls() {
    const wrap = document.createElement('div');
    wrap.className = 'hg-controls';
    wrap.innerHTML = `
      <div class="hg-seg" role="group" aria-label="Modo de visualização">
        <button type="button" data-view="table" title="Visualizar em tabela">${ICON_TABLE}</button>
        <button type="button" data-view="cards" title="Visualizar em cards">${ICON_CARDS}</button>
      </div>
      <button type="button" class="hg-switch" data-switch="hideBlank" role="switch">
        <span class="hg-track"><span class="hg-thumb"></span></span>
        <span>Ocultar sem nome</span>
        <em class="hg-count"></em>
      </button>`;
    wrap.addEventListener('click', (e) => {
      const b = e.target.closest('button');
      if (!b) return;
      if (b.dataset.view) prefs.view = b.dataset.view;
      else if (b.dataset.switch === 'hideBlank') prefs.hideBlank = !prefs.hideBlank;
      save();
      render();
    });
    return wrap;
  }

  function render() {
    if (!location.pathname.includes('/contacts')) return;

    const table = findPeopleTable();
    document.querySelectorAll('table.hg-people').forEach((t) => { if (t !== table) t.classList.remove('hg-people'); });
    if (!table) {
      document.querySelector('.hg-controls')?.remove();
      document.querySelector('.hg-empty')?.remove();
      return;
    }

    table.classList.add('hg-people');
    table.dataset.hgView = prefs.view;
    table.dataset.hgHideBlank = prefs.hideBlank ? '1' : '0';

    // As linhas são reaproveitadas pelo React: recalcula a marcação a cada passada
    let blank = 0;
    const rows = table.querySelectorAll('tbody tr');
    rows.forEach((tr) => {
      // nome só com emoji (renderizado como <img class="emojione">) conta como nome preenchido
      const cell = tr.children[1];
      const isBlank = !(cell?.textContent || '').trim() && !cell?.querySelector('img.emojione');
      if (isBlank) { tr.dataset.hgBlank = '1'; blank++; } else { delete tr.dataset.hgBlank; }
    });

    // Se o filtro esconderia TODAS as linhas, avisa em vez de deixar a tela em branco
    let empty = document.querySelector('.hg-empty');
    if (prefs.hideBlank && blank > 0 && blank === rows.length) {
      if (!empty) {
        empty = document.createElement('div');
        empty.className = 'hg-empty';
        empty.innerHTML = '<strong>Nenhum contato com nome nesta página</strong><span></span><button type="button">Mostrar contatos sem nome</button>';
        empty.querySelector('button').addEventListener('click', () => { prefs.hideBlank = false; save(); render(); });
        table.after(empty);
      }
      empty.querySelector('span').textContent =
        `${blank} contato${blank > 1 ? 's' : ''} sem nome ${blank > 1 ? 'estão ocultos' : 'está oculto'}. Use as setas para ver outras páginas.`;
    } else if (empty) {
      empty.remove();
    }

    let ctrl = document.querySelector('.hg-controls');
    if (!ctrl) {
      const add = [...document.querySelectorAll('button')].find((b) => /Adicionar contato/i.test(b.textContent));
      if (!add) return;
      ctrl = buildControls();
      add.parentElement.insertBefore(ctrl, add);
    }
    ctrl.querySelectorAll('[data-view]').forEach((b) => b.classList.toggle('is-active', b.dataset.view === prefs.view));
    const sw = ctrl.querySelector('.hg-switch');
    sw.classList.toggle('is-on', prefs.hideBlank);
    sw.setAttribute('aria-checked', String(prefs.hideBlank));
    ctrl.querySelector('.hg-count').textContent = blank ? String(blank) : '';
  }

  let queued = false;
  const schedule = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => { queued = false; render(); });
  };

  new MutationObserver(schedule).observe(document.documentElement, { childList: true, subtree: true, characterData: true });
  schedule();
})();
