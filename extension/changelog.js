// Histórico de versões mostrado no card "Novidades" da tela de login.
// Ao lançar uma versão: adicione a entrada NO TOPO e atualize o "version" do manifest.json.
// (loaded antes do login.js, no mesmo content script)
window.HG_CHANGELOG = [
  {
    version: '0.2.0',
    date: '2026-11-28',
    title: 'Tela de login renovada',
    items: [
      'Login com visual moderno e temas claro e escuro',
      'Interruptor de tema direto na tela de login',
      'Card de novidades com o histórico da extensão',
    ],
  },
  {
    version: '0.1.0',
    date: '2026-11-25',
    title: 'Primeira versão',
    items: [
      'Modo escuro com interruptor no menu lateral',
      'Home, contatos e chats com visual renovado',
      'Contatos em cards ou tabela e botão "Ocultar sem nome"',
      'Chat: busca, balões, campo de mensagem e modais redesenhados',
    ],
  },
];

// Onde ver o histórico completo (README do repositório)
window.HG_CHANGELOG_URL = 'https://github.com/ChromeExtensionsETECC/Extensao_Huggy#versões-disponíveis';
