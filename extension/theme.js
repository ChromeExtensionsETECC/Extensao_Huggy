(() => {
  'use strict';

  // Tema: 'light' (padrão) ou 'dark'. Guardado no navegador e aplicado como
  // atributo no <html> o mais cedo possível (run_at: document_start) para não piscar.
  const KEY = 'hg-theme';
  const read = () => { try { return localStorage.getItem(KEY) === 'dark' ? 'dark' : 'light'; } catch (_) { return 'light'; } };
  let theme = read();
  const apply = () => document.documentElement.setAttribute('data-hg-theme', theme);
  apply();

  const SUN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
  const MOON = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';

  function sync(btn) {
    btn.setAttribute('aria-checked', String(theme === 'dark'));
    btn.title = theme === 'dark' ? 'Modo escuro ativado (clique para o modo claro)' : 'Modo claro ativado (clique para o modo escuro)';
  }

  function build() {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'hg-theme-switch';
    btn.setAttribute('role', 'switch');
    btn.setAttribute('aria-label', 'Modo escuro');
    btn.innerHTML = `<span class="hg-ts-ico hg-ts-sun">${SUN}</span><span class="hg-ts-ico hg-ts-moon">${MOON}</span><span class="hg-ts-thumb"></span>`;
    btn.addEventListener('click', () => {
      theme = theme === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem(KEY, theme); } catch (_) {}
      apply();
      sync(btn);
    });
    return btn;
  }

  // O menu lateral é re-renderizado pelo app: reinsere o switch se ele sumir
  function ensure() {
    if (document.querySelector('.hg-theme-switch')) return;
    const area = document.querySelector('aside [class*="_bot_"] [class*="_icons_area_"]');
    if (!area) return;
    const btn = build();
    sync(btn);
    const line = area.querySelector('[class*="_line_bottom_"]');
    area.insertBefore(btn, line ? line.nextSibling : area.firstChild);
  }

  let queued = false;
  const schedule = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => { queued = false; ensure(); });
  };
  new MutationObserver(schedule).observe(document.documentElement, { childList: true, subtree: true });
  schedule();

  // mantém várias abas da Huggy sincronizadas
  window.addEventListener('storage', (e) => {
    if (e.key !== KEY) return;
    theme = read();
    apply();
    const btn = document.querySelector('.hg-theme-switch');
    if (btn) sync(btn);
  });
})();
