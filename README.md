<div align="center">
  <br />
  <h1>⚽ PLAYSCORE</h1>
  <p><strong>Sistema de Gerenciamento e Organização de Campeonatos de Futebol</strong></p>
  
  # Veja e acompanhe:
- site: https://arthurlemos8.github.io/PlayScore/
  
  <p>
    <a href="#-funcionalidades">Funcionalidades</a> •
    <a href="#-tecnologias-utilizadas">Tecnologias</a> •
    <a href="#-estrutura-do-projeto">Estrutura</a> •
    <a href="#-como-executar">Como Executar</a> •
    <a href="#-licença">Licença</a>
  </p>

  <br />
</div>

---

## 📌 Sobre o Projeto

O **PLAYSCORE** é uma aplicação web moderna e intuitiva desenvolvida para automatizar a gestão de torneios e campeonatos de futebol. Com ele, você pode cadastrar equipes, gerar tabelas de confrontos rodada a rodada, registrar os placares e acompanhar a tabela de classificação atualizada em tempo real.

O projeto conta com um design limpo no estilo **Dark Mode / SaaS**, interface 100% responsiva para dispositivos móveis e persistência local de dados.

---

## 🚀 Funcionalidades

- **Dashboard Geral:** Estatísticas em tempo real com métricas do torneio (Total de Jogos, Rodadas, Finalizados, Pendentes, Melhor Ataque e Melhor Defesa).
- **Gestão de Times:** Cadastro de equipes participantes com suporte a nome e escudo.
- **Gerador de Confrontos:** Sorteio automático de rodadas e partidas no formato "todos contra todos".
- **Lançamento de Placares:** Atualização simples e rápida dos resultados de cada partida.
- **Tabela de Classificação em Tempo Real:**
  - Pontos ($P$)
  - Vitórias ($V$), Empates ($E$) e Derrotas ($D$)
  - Gols Pró ($GP$), Gols Contra ($GC$) e Saldo de Gols ($SG$)
- **Layout Responsivo:** Interface adaptada para navegação fluida em celulares, tablets e computadores.
- **Persistência de Dados:** Armazenamento local (`localStorage`), garantindo que seus dados permaneçam salvos mesmo ao fechar o navegador.

---

## 🛠️ Tecnologias Utilizadas

O projeto foi construído utilizando tecnologias web fundamentais:

- **HTML5:** Estruturação semântica da aplicação.
- **CSS3:** Estilização customizada em Dark Mode com CSS Grid, Flexbox e Media Queries para responsividade.
- **JavaScript (ES6+):** Lógica do sistema, manipulação de DOM e algoritmos de sorteio e classificação.
- **[Lucide Icons](https://lucide.dev/):** Conjunto de ícones leves e modernos em vetor/SVG.
- **[Toastify JS](https://apvarun.github.io/toastify-js/):** Notificações elegantes de feedback para o usuário.

---

## 📂 Estrutura do Projeto

```text
playscore/
│
├── css/
│   └── style.css            # Estilos globais e responsividade
│
├── js/
│   ├── times.js             # Lógica de cadastro e edição de times
│   ├── confrontos.js        # Geração da tabela de jogos e placares
│   ├── classificacao.js     # Cálculo e atualização da tabela de pontos
│   ├── dashboard.js         # Métricas e cartões da dashboard
│   ├── storage.js           # Gerenciamento do localStorage
│   ├── menu.js              # Navegação entre telas e estados do menu
│   └── script.js            # Script principal de inicialização
│
├── index.html               # Estrutura principal da aplicação
└── README.md                # Documentação do repositório