
function mostrarSecao(secao) {
    secaoWelcomeCard.style.display = "none";
    secaoDashboard.style.display = "none";
    secaoClassificacao.style.display = "none";
    secaoConfrontos.style.display = "none";
    secaoTimes.style.display = "none";

    secao.style.display = "block";
}

function atualizarMenuAtivo(botaoClicado) {
    document.querySelectorAll(".Menu button").forEach((botao) => {
        botao.classList.remove("active");
    });
    botaoClicado.classList.add("active");
}

btnPaginaInicial.addEventListener("click", () => {
    mostrarSecao(secaoWelcomeCard);
    atualizarMenuAtivo(btnPaginaInicial);
});

btnInicio.addEventListener("click", () => {
    mostrarSecao(secaoDashboard);
    atualizarMenuAtivo(btnInicio);
});

btnTimes.addEventListener("click", () => {
    mostrarSecao(secaoTimes);
    atualizarMenuAtivo(btnTimes);
});         

btnConfrontos.addEventListener("click", () => {
    mostrarSecao(secaoConfrontos);
    atualizarMenuAtivo(btnConfrontos);
});

btnClassificacao.addEventListener("click", () => {
    mostrarSecao(secaoClassificacao);
    atualizarMenuAtivo(btnClassificacao);
});