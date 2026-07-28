let times = [];
let confrontos = [];

btnCadastrar.addEventListener("click", cadastrarTimes);
btnSortear.addEventListener("click", gerarCampeonato);
btnReset.addEventListener("click", reiniciarCampeonato);

carregarDados();
mostrarSecao(secaoDashboard);