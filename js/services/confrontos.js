function renderizarConfrontos() {
  listaRodadas.innerHTML = "";
  const rodadasAgrupadas = {};

  confrontos.forEach((confronto) => {
    if (!rodadasAgrupadas[confronto.rodada]) {
      rodadasAgrupadas[confronto.rodada] = [];
    }

    rodadasAgrupadas[confronto.rodada].push(confronto);
  });

  Object.keys(rodadasAgrupadas).forEach((numeroRodada) => {
    const divRodada = document.createElement("div");

    divRodada.innerHTML = `
        <h3><i data-lucide="calendar"></i> Rodada ${numeroRodada}</h3>

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

    const tbodyRodada = document.getElementById(`rodada-${numeroRodada}`);
    rodadasAgrupadas[numeroRodada].forEach((confronto) => {
      const index = confrontos.indexOf(confronto);
      const tr = document.createElement("tr");

      const escudoMandanteHTML = confronto.escudoMandante
        ? `<img src="${confronto.escudoMandante}" class="escudo-time-img" alt="${confronto.mandante}">`
        : `<div class="escudo-placeholder"><i data-lucide="shield"></i></div>`;

      const escudoVisitanteHTML = confronto.escudoVisitante
        ? `<img src="${confronto.escudoVisitante}" class="escudo-time-img" alt="${confronto.visitante}">`
        : `<div class="escudo-placeholder"><i data-lucide="shield"></i></div>`;

      tr.innerHTML = `
                <td class="col-num">${index + 1}</td>
                <td class="time-info">
                    ${escudoMandanteHTML}
                    <span>${confronto.mandante}</span>
                </td>
                <td class="time-info">
                    ${escudoVisitanteHTML}
                    <span>${confronto.visitante}</span>
                </td>
                <td>
                    ${
                      confronto.golsMandante === null
                        ? "- x -"
                        : `<strong>${confronto.golsMandante} x ${confronto.golsVisitante}</strong>`
                    }
                </td>
                <td>
                    ${
                      confronto.golsMandante === null
                        ? "⏳ Pendente"
                        : "✅ Finalizado"
                    }
                </td>
                <td>
                     <button class="btn-resultado" onclick="lancarResultado(${index})">
                        <i data-lucide="clipboard-pen"></i>
                         
                    </button>
                </td>
            `;
      tbodyRodada.appendChild(tr);
      lucide.createIcons();
    });
  });
  document.getElementById("total-jogos").textContent = confrontos.length;
}

function gerarCampeonato() {
  confrontos = [];
  let timesRodadas = [...times];
  if (timesRodadas.length % 2 !== 0) {
    timesRodadas.push({
      nome: "FOLGA",
    });
  }

  for (let rodada = 1; rodada < timesRodadas.length; rodada++) {
    for (let i = 0; i < timesRodadas.length / 2; i++) {
      const mandante = timesRodadas[i];
      const visitante = timesRodadas[timesRodadas.length - 1 - i];
      if (mandante.nome !== "FOLGA" && visitante.nome !== "FOLGA") {
        if (rodada % 2 === 0) {
          confrontos.push({
            rodada: rodada,
            mandante: visitante.nome,
            escudoMandante: visitante.escudo || "",
            visitante: mandante.nome,
            escudoVisitante: mandante.escudo || "",
            golsMandante: null,
            golsVisitante: null,
          });
        } else {
          confrontos.push({
            rodada: rodada,
            mandante: mandante.nome,
            escudoMandante: mandante.escudo || "",
            visitante: visitante.nome,
            escudoVisitante: visitante.escudo || "",
            golsMandante: null,
            golsVisitante: null,
          });
        }
      }
    }
    const ultimo = timesRodadas.pop();
    timesRodadas.splice(1, 0, ultimo);
  }
  let rodadas;

  if (times.length % 2 === 0) {
    rodadas = times.length - 1;
  } else {
    rodadas = times.length;
  }
  totalRodadas.textContent = rodadas;

  salvarDados();
  atualizarDashboard();
  renderizarConfrontos();
  renderizarClassificacao();
  mostrarToast("Campeonato gerado com sucesso!", "success");
}

function lancarResultado(index) {
  if (
    confrontos[index].golsMandante !== null &&
    confrontos[index].golsVisitante !== null
  ) {
    const confirmar = confirm("Esse jogo já possui resultado. Deseja alterar?");

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

  if (
    !Number.isInteger(Number(golsMandante)) ||
    !Number.isInteger(Number(golsVisitante))
  ) {
    alert("Digite apenas números Inteiros.");
    return;
  }

  confrontos[index].golsMandante = Number(golsMandante);
  confrontos[index].golsVisitante = Number(golsVisitante);

  salvarDados();
  atualizarDashboard();
  renderizarConfrontos();
  renderizarClassificacao();
  mostrarToast("Resultado registrado!", "success");
}

function reiniciarCampeonato() {
  const confirmar = confirm("Tem certeza que deseja apagar todos os dados?");

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
  mostrarToast("Campeonato reiniciado!", "warning");
}
