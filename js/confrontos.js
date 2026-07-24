

function renderizarConfrontos() {
    listaRodadas.innerHTML = "";
    const rodadasAgrupadas = {};

    confrontos.forEach(confronto => {

        if (!rodadasAgrupadas[confronto.rodada]) {
            rodadasAgrupadas[confronto.rodada] = [];
        }

        rodadasAgrupadas[confronto.rodada].push(confronto);
    });

    Object.keys(rodadasAgrupadas).forEach(numeroRodada => {

        const divRodada = document.createElement("div");

        divRodada.innerHTML = `
        <h3>🏆 Rodada ${numeroRodada}</h3>

        <table class="tabela-rodada">
            <thead>
                <tr>
                    <th>Jogo</th>
                    <th>Mandante</th>
                    <th>Visitante</th>
                    <th>Resultado</th>
                    <th>Status</th>
                    <th>Ações</th>
                </tr>
            </thead>

            <tbody id="rodada-${numeroRodada}">
            </tbody>
        </table>
    `;

        listaRodadas.appendChild(divRodada);

        const tbodyRodada = document.getElementById(
            `rodada-${numeroRodada}`
        );
        rodadasAgrupadas[numeroRodada].forEach((confronto) => {

            const index = confrontos.indexOf(confronto);

            const tr = document.createElement("tr");

            tr.innerHTML = `
        <td>${index + 1}</td>
        <td>${confronto.mandante}</td>
        <td>${confronto.visitante}</td>

        <td>
            ${confronto.golsMandante === null
                    ? "- x -"
                    : `${confronto.golsMandante} x ${confronto.golsVisitante}`
                }
        </td>

        <td>
            ${confronto.golsMandante === null
                    ? "⏳ Pendente"
                    : "✅ Finalizado"
                }
        </td>

        <td>
            <button onclick="lancarResultado(${index})">
                Resultado
            </button>
        </td>
    `;
            tbodyRodada.appendChild(tr);

        });

    });
    document.getElementById("total-jogos").textContent = confrontos.length;
}

function gerarCampeonato() {
    confrontos = [];
    let timesRodadas = [...times];
    if (timesRodadas.length % 2 !== 0) {
        timesRodadas.push({
            nome: "FOLGA"
        });
    };


    for (let rodada = 1; rodada < timesRodadas.length; rodada++) {
        for (let i = 0; i < timesRodadas.length / 2; i++) {
            const mandante = timesRodadas[i];
            const visitante = timesRodadas[timesRodadas.length - 1 - i];
            if (mandante.nome !== "FOLGA" && visitante.nome !== "FOLGA") {
                if (rodada % 2 === 0) {
                    confrontos.push({
                        rodada: rodada,
                        mandante: visitante.nome,
                        visitante: mandante.nome,
                        golsMandante: null,
                        golsVisitante: null
                    });
                } else {

                    confrontos.push({
                        rodada: rodada,
                        mandante: mandante.nome,
                        visitante: visitante.nome,
                        golsMandante: null,
                        golsVisitante: null
                    });
                }
            }
        }
        const ultimo = timesRodadas.pop();
        timesRodadas.splice(1, 0, ultimo);
    }
    let rodadas;

    if (times.length % 2 === 0) {
        rodadas = times.length - 1
    }
    else {
        rodadas = times.length;
    }
    totalRodadas.textContent = rodadas;

    salvarDados();
    atualizarDashboard();
    renderizarConfrontos();
    renderizarClassificacao();
}


function lancarResultado(index) {

    if (
        confrontos[index].golsMandante !== null &&
        confrontos[index].golsVisitante !== null
    ) {
        const confirmar = confirm(
            "Esse jogo já possui resultado. Deseja alterar?"
        );

        if (!confirmar) {
            return;
        }
    }

    const golsMandante = prompt("Gols do mandante:");

    if (golsMandante === null) {
        return;
    }

    const golsVisitante = prompt("Gols do visitante:");

    if (golsVisitante === null) {
        return;
    }

    if (isNaN(golsMandante) || isNaN(golsVisitante)) {
        alert("Digite apenas números.");
        return;
    }

    if (golsMandante < 0 || golsVisitante < 0) {
        alert("Os gols não podem ser negativos.");
        return;
    }

    if (!Number.isInteger(Number(golsMandante)) || !Number.isInteger(Number(golsVisitante))) {
        alert("Digite apenas números Inteiros.");
        return;
    }

    confrontos[index].golsMandante = Number(golsMandante);
    confrontos[index].golsVisitante = Number(golsVisitante);

    salvarDados();
    atualizarDashboard();
    renderizarConfrontos();
    renderizarClassificacao();
}

function reiniciarCampeonato() {

    const confirmar = confirm(
        "Tem certeza que deseja apagar todos os dados?"
    );

    if (!confirmar) {
        return;
    }

    times = [];
    confrontos = [];

    localStorage.clear();

    totalTimes.textContent = 0;
    totalRodadas.textContent = 0;
    document.getElementById("total-jogos").textContent = 0;

    renderizarTimes();
    renderizarConfrontos();
    renderizarClassificacao();
}
