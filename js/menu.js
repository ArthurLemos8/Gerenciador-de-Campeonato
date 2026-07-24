function mostrarSecao(secao) {
    secaoWelcomeCard.style.display = "none";
    secaoDashboard.style.display = "none";
    secaoClassificacao.style.display = "none";
    secaoConfrontos.style.display = "none";
    secaoTimes.style.display = "none";

    secao.style.display = "block";
}

document.getElementById("btnPaginaInicial").addEventListener("click", () => {
    mostrarSecao(secaoWelcomeCard);
});

document.getElementById("btnInicio").addEventListener("click", () => {
    mostrarSecao(secaoDashboard);
});
document.getElementById("btnTimes").addEventListener("click", () => {
    mostrarSecao(secaoTimes);
});
document.getElementById("btnConfrontos").addEventListener("click", () => {
    mostrarSecao(secaoConfrontos);
});

document.getElementById("btnClassificacao").addEventListener("click", () => {
    mostrarSecao(secaoClassificacao);
});