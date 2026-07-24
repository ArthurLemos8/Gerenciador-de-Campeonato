let times = [];
let confrontos = [];

const inputNome = document.getElementById("nomeTime");
const btnCadastrar = document.getElementById("btnCadastrar");
const listaTimes = document.getElementById("listaTimes");
const totalTimes = document.getElementById("total-times");
const btnSortear = document.getElementById("btnSortear");
const listaConfrontos = document.getElementById("listaConfrontos");
const listaRodadas = document.getElementById("listaRodadas");
const totalRodadas = document.getElementById("total-rodadas");
const listaClassificacao = document.getElementById("listaClassificacao");
const secaoTimes = document.getElementById("secaoTimes");
const secaoConfrontos = document.getElementById("secaoConfrontos");
const secaoClassificacao = document.getElementById("secaoClassificacao");
const btnReset = document.getElementById("btnReset");
const totalFinalizados = document.getElementById("total-finalizados");
const totalPendentes = document.getElementById("total-pendentes");
const cardMelhorAtaque = document.getElementById("melhor-ataque");
const cardMelhorDefesa = document.getElementById("melhor-defesa");
const secaoDashboard = document.getElementById("secaoDashboard");

btnCadastrar.addEventListener("click", cadastrarTimes);
btnSortear.addEventListener("click", gerarCampeonato);
btnReset.addEventListener("click", reiniciarCampeonato);

carregarDados();
mostrarSecao(secaoDashboard);