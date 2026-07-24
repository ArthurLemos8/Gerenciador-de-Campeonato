function salvarDados() {

    localStorage.setItem("times", JSON.stringify(times));
    localStorage.setItem("confrontos", JSON.stringify(confrontos))
}

function carregarDados() {
    const timeSalvos = localStorage.getItem("times");
    const confrontosSalvos = localStorage.getItem("confrontos");

    if (confrontosSalvos) {
        confrontos = JSON.parse(confrontosSalvos);
    }
    if (timeSalvos) {
        times = JSON.parse(timeSalvos);
    }
    renderizarTimes();
    atualizarDashboard();
    renderizarConfrontos();
    renderizarClassificacao();
}