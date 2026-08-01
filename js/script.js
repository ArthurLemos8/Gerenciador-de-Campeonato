btnCadastrar?.addEventListener("click", cadastrarTimes);
btnSortear?.addEventListener("click", gerarCampeonato);
btnReset?.addEventListener("click", reiniciarCampeonato);

document.addEventListener("DOMContentLoaded", () => {
  if (typeof mostrarSecao === "function" && typeof secaoDashboard !== "undefined") {
    mostrarSecao(secaoDashboard);
  }
});

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log("Firebase conectado! Carregando dados...");

    if (typeof renderizarTimes === "function") renderizarTimes();
    if (typeof renderizarConfrontos === "function") renderizarConfrontos();
    if (typeof renderizarClassificacao === "function") renderizarClassificacao();
  }
});