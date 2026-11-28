# Huggy Modern UI

Extensão para **Google Chrome** (e navegadores Chromium, como Edge e Brave) que deixa a interface da [Huggy](https://www.huggy.app) mais moderna e agradável de usar, com **modo claro e modo escuro**.

Ela só atua nas páginas da Huggy (`huggy.app`) e não coleta nem envia nenhum dado.

## O que ela faz

- **Modo escuro** com um interruptor no menu lateral (a escolha fica salva no navegador).
- **Tela de login** renovada, com tema claro e escuro, interruptor de tema e um card com as novidades da extensão.
- **Página inicial** com fundo em pattern, cards com leve efeito 3D e ícones dentro de boxes.
- **Contatos** com visualização em **tabela ou cards**, espaçamento entre as linhas, botão **Ocultar sem nome** e colunas Organizações/Grupos ocultas.
- **Chats** com cards de conversa, busca com lista de filtros redesenhada, balões de mensagem com melhor contraste, campo de mensagem arredondado, modais com efeito acrílico e painéis (filtros, histórico, notificações) no tema.
- Fonte *Plus Jakarta Sans* em toda a interface.

## Versões disponíveis

| Versão | Data | Download | Manual |
|--------|------|----------|--------|
| **0.2.0** (mais recente) | 28/11/2026 | [`Huggy-Modern-UI-v0.2.0.zip`](downloads/v0.2.0/Huggy-Modern-UI-v0.2.0.zip) | [`manual_resumido.txt`](downloads/v0.2.0/manual_resumido.txt) |
| 0.1.0  | 25/11/2026 | [`Huggy-Modern-UI-v0.1.0.zip`](downloads/v0.1.0/Huggy-Modern-UI-v0.1.0.zip) | [`manual_resumido.txt`](downloads/v0.1.0/manual_resumido.txt) |

Cada versão fica em `downloads/vX.Y.Z/`, com o `.zip` daquela versão e o seu `manual_resumido.txt`.

## Histórico de mudanças

### 0.2.0 — 28/11/2026
- Tela de login renovada, com visual moderno e temas claro e escuro.
- Interruptor de tema direto na tela de login (sem escolha salva, ela segue o tema do sistema).
- Card "Novidades da extensão" na tela de login, com o histórico de versões.

### 0.1.0 — 25/11/2026
- Modo escuro com interruptor no menu lateral.
- Home, contatos e chats com visual renovado.
- Contatos em cards ou tabela e botão "Ocultar sem nome".
- Chat: busca, balões, campo de mensagem e modais redesenhados.

---

## Passo a passo: baixar e instalar

### 1. Baixar o arquivo

Escolha **uma** das opções:

**Opção A — direto pelo GitHub (mais simples)**

1. Abra a pasta [`downloads/v0.2.0`](downloads/v0.2.0) neste repositório.
2. Clique em `Huggy-Modern-UI-v0.2.0.zip`.
3. Clique no botão **Download raw file** (ícone de seta para baixo, no canto superior direito do arquivo).

**Opção B — baixar o repositório inteiro**

1. Na página principal do repositório, clique no botão verde **Code**.
2. Clique em **Download ZIP**.
3. Extraia esse arquivo e pegue o `.zip` da extensão dentro de `downloads/v0.2.0/`.

**Opção C — usando git**

```bash
git clone https://github.com/ChromeExtensionsETECC/Extensao_Huggy.git
```

O `.zip` fica em `Extensao_Huggy/downloads/v0.2.0/`. A pasta `Extensao_Huggy/extension/` também já contém a extensão pronta para carregar, sem precisar extrair nada.

> Se o repositório for privado, é preciso estar logado no GitHub com uma conta que tenha acesso à organização.

### 2. Extrair o arquivo

1. Clique com o botão direito no `.zip` e escolha **Extrair tudo…** (no Windows).
2. Escolha um lugar **fixo**, por exemplo `C:\Extensoes\Huggy-Modern-UI`.

> **Importante:** não apague nem mova essa pasta depois da instalação. O Chrome lê a extensão diretamente dela.

Dentro da pasta extraída devem estar os arquivos `manifest.json`, `content.css`, `login.css`, `theme.js`, `contacts.js`, `changelog.js` e `login.js`.

### 3. Instalar no Chrome

1. Abra o Chrome e acesse `chrome://extensions` (digite na barra de endereços e tecle Enter).
2. No canto superior direito, ligue a chave **Modo do desenvolvedor**.
3. Clique em **Carregar sem compactação**.
4. Selecione a pasta que você extraiu (a que contém o `manifest.json`) e clique em **Selecionar pasta**.
5. A extensão **Huggy Modern UI** aparecerá na lista, ativada.

### 4. Usar

1. Abra a [Huggy](https://www.huggy.app) (ou atualize a página com `F5`).
2. O novo visual já aparece. Para alternar entre claro e escuro, use o interruptor com sol e lua no menu lateral esquerdo, logo acima do ícone de ajuda.
3. Na **tela de login**, o interruptor de tema fica no canto superior direito e o card "Novidades da extensão" fica no canto inferior esquerdo (clique no título dele para recolher ou expandir).

---

## Atualizar para uma versão nova

(vale também para sair da 0.1.0 e ir para a 0.2.0)

1. Baixe o `.zip` da versão nova (passo 1 acima) e extraia.
   Você pode sobrescrever a pasta antiga (com o Chrome fechado) ou usar uma pasta nova.
2. Em `chrome://extensions`, clique no ícone de recarregar (seta circular) no cartão da extensão.
   Se usou uma pasta nova, remova a extensão antiga e carregue a nova (passo 3).
3. Atualize a página da Huggy (`F5`).

## Remover

Em `chrome://extensions`, clique em **Remover** no cartão da extensão.

## Problemas comuns

| Sintoma | O que fazer |
|---------|-------------|
| Nada mudou na Huggy | Atualize a página (`F5`) e confira, em `chrome://extensions`, se a extensão está **ativada**. |
| A tela de login continua como antes | Confirme que você carregou a versão **0.2.0** (o número aparece no cartão da extensão em `chrome://extensions`) e recarregue a extensão. |
| Erro *"Arquivo de manifesto ausente ou ilegível"* | Você selecionou a pasta errada. Escolha a pasta que contém o `manifest.json` diretamente, não uma pasta acima dela. |
| A extensão sumiu depois de mover a pasta | Carregue-a novamente (passo 3). |
| Algo ficou estranho depois de uma atualização da Huggy | A extensão depende de nomes internos da página, que a Huggy pode mudar. Avise quem mantém a extensão para ajustar. |

## Privacidade

- Não coleta, armazena em servidores nem envia dados.
- Só atua em `huggy.app`.
- Na tela de login, só muda o visual: **não lê nem guarda e-mail ou senha**.
- Guarda no próprio navegador apenas suas preferências (tema, modo de visualização de contatos e card de novidades recolhido).
- A única requisição adicional é o carregamento da fonte *Plus Jakarta Sans* do Google Fonts.

---

## Para quem mantém o projeto

```
Extensao_Huggy/
├── README.md
├── extension/                      código-fonte da extensão (versão mais recente)
│   ├── manifest.json
│   ├── content.css                 todo o visual do painel, com tokens de cor para os temas claro e escuro
│   ├── login.css                   visual da tela de login (domínio legacy.huggy.app)
│   ├── theme.js                    interruptor de tema do painel
│   ├── contacts.js                 visualização em cards e filtros da tela de contatos
│   ├── changelog.js                histórico de versões mostrado no card da tela de login
│   └── login.js                    interruptor de tema e card de novidades da tela de login
└── downloads/
    └── vX.Y.Z/
        ├── Huggy-Modern-UI-vX.Y.Z.zip
        └── manual_resumido.txt
```

**Ao lançar uma nova versão:**

1. Altere `version` em `extension/manifest.json`.
2. Adicione a entrada da versão **no topo** de `extension/changelog.js` (é o que aparece no card da tela de login).
3. Gere o `.zip` com **todos** os arquivos que o `manifest.json` cita, na **raiz** do arquivo.
4. Crie `downloads/vX.Y.Z/` com o `.zip` e um `manual_resumido.txt` atualizado. Não altere as pastas de versões anteriores.
5. Adicione a versão à tabela *Versões disponíveis* e ao *Histórico de mudanças* deste README.

**Regra do projeto:** toda alteração visual deve funcionar nos **dois** temas (claro e escuro). Cores novas entram como variáveis `--hg-*` em `content.css`, definidas para os dois temas.
