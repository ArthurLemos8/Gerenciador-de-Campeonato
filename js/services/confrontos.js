async function renderizarConfrontos() {
  if (!listaRodadas) return;

  try {
    const confrontosDoBanco = await BancoService.confrontos.listarTodos();

    listaRodadas.innerHTML = "";
    const rodadasAgrupadas = {};

    confrontosDoBanco.forEach((confronto) => {
      if (!rodadasAgrupadas[confronto.rodada]) {
        rodadasAgrupadas[confronto.rodada] = [];
      }
      rodadasAgrupadas[confronto.rodada].push(confronto);
    });

    Object.keys(rodadasAgrupadas)
      .sort((a, b) => Number(a) - Number(b))
      .forEach((numeroRodada) => {
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
            <tbody id="rodada-${numeroRodada}"></tbody>
        </table>
      `;

        listaRodadas.appendChild(divRodada);

        const tbodyRodada = document.getElementById(`rodada-${numeroRodada}`);

        rodadasAgrupadas[numeroRodada].forEach((confronto, index) => {
          const tr = document.createElement("tr");
          const mandanteNome = confronto.mandante || confronto.timeCasaNome;
          const visitanteNome =
            confronto.visitante || confronto.timeVisitanteNome;
          const escudoMandante =
            confronto.escudoMandante || confronto.timeCasaEscudo;
          const escudoVisitante =
            confronto.escudoVisitante || confronto.timeVisitanteEscudo;
          const golsCasa = confronto.golsMandante ?? confronto.golsCasa;
          const golsVisitante =
            confronto.golsVisitante ?? confronto.golsVisitante;

          const escudoMandanteHTML = escudoMandante
            ? `<img src="${escudoMandante}" class="escudo-time-img" alt="${mandanteNome}">`
            : `<div class="escudo-placeholder"><i data-lucide="shield"></i></div>`;

          const escudoVisitanteHTML = escudoVisitante
            ? `<img src="${escudoVisitante}" class="escudo-time-img" alt="${visitanteNome}">`
            : `<div class="escudo-placeholder"><i data-lucide="shield"></i></div>`;

          tr.innerHTML = `
            <td class="col-num">${index + 1}</td>
            <td class="time-info">
                ${escudoMandanteHTML}
                <span>${mandanteNome}</span>
            </td>
            <td class="time-info">
                ${escudoVisitanteHTML}
                <span>${visitanteNome}</span>
            </td>
            <td>
                ${
                  golsCasa === null || golsCasa === undefined
                    ? "- x -"
                    : `<strong>${golsCasa} x ${golsVisitante}</strong>`
                }
            </td>
            <td>
                ${
                  golsCasa === null || golsCasa === undefined
                    ? "⏳ Pendente"
                    : "✅ Finalizado"
                }
            </td>
            <td>
                <button class="btn-resultado" onclick="lancarResultado('${confronto.id}', ${golsCasa}, ${golsVisitante})">
                    <i data-lucide="clipboard-pen"></i>
                </button>
            </td>
        `;
          tbodyRodada.appendChild(tr);
        });
      });

    const elTotalJogos = document.getElementById("total-jogos");
    if (elTotalJogos) {
      elTotalJogos.textContent = confrontosDoBanco.length;
    }

    if (window.lucide) {
      lucide.createIcons();
    }
  } catch (error) {
    console.error("Erro ao renderizar confrontos:", error);
    mostrarToast("Erro ao carregar confrontos.", "error");
  }
}

async function gerarCampeonato() {

  const btn = document.getElementById("btnSortear");
  if (btn && btn.disabled) return;
  if (btn) {
    btn.disabled = true;
    btn.textContent = "Gerando...";
  }

  try {
    const timesDoBanco = await BancoService.times.listarTodos();

    if (timesDoBanco.length < 2) {
      mostrarToast(
        "Cadastre pelo menos 2 times para gerar os confrontos!",
        "error",
      );
      return;
    }

    const confrontosGerados = [];
    const listaTimes = [...timesDoBanco];

    if (listaTimes.length % 2 !== 0) {
      listaTimes.push({ id: null, nome: "FOLGA" });
    }

    const totalRodadas = listaTimes.length - 1;
    const jogosPorRodada = listaTimes.length / 2;

    for (let rodada = 0; rodada < totalRodadas; rodada++) {
      for (let i = 0; i < jogosPorRodada; i++) {
        const casa = listaTimes[i];
        const visitante = listaTimes[listaTimes.length - 1 - i];

        if (casa.id !== null && visitante.id !== null) {
          confrontosGerados.push({
            rodada: rodada + 1,
            mandante: casa.nome,
            escudoMandante: casa.escudoUrl || casa.escudo || "",
            timeCasaId: casa.id,
            visitante: visitante.nome,
            escudoVisitante: visitante.escudoUrl || visitante.escudo || "",
            timeVisitanteId: visitante.id,
            golsMandante: null,
            golsVisitante: null,
            status: "pendente",
          });
        }
      }
      listaTimes.splice(1, 0, listaTimes.pop());
    }

    await BancoService.confrontos.salvarJogos(confrontosGerados);
    mostrarToast("Confrontos gerados com sucesso!", "success");
    await renderizarConfrontos();
  } catch (error) {
    console.error("Erro ao gerar campeonato:", error);
    mostrarToast("Erro ao gerar confrontos no banco.", "error");
  }

 finally {
    if (btn) { 
      btn.disabled = false; 
      btn.innerHTML = `<i data-lucide="dices"></i> Sortear Confrontos`;
      if (window.lucide) lucide.createIcons();
    }
  }
}

async function lancarResultado(idJogo, golsMandanteAtual, golsVisitanteAtual) {
  if (golsMandanteAtual !== null && golsMandanteAtual !== undefined) {
    if (!confirm("Esse jogo já possui resultado. Deseja alterar?")) return;
  }

  const inputMandante = prompt("Gols do mandante:");
  if (inputMandante === null) return;

  const inputVisitante = prompt("Gols do visitante:");
  if (inputVisitante === null) return;

  const golsM = parseInt(inputMandante, 10);
  const golsV = parseInt(inputVisitante, 10);

  if (isNaN(golsM) || isNaN(golsV) || golsM < 0 || golsV < 0) {
    alert("Digite apenas números inteiros válidos e não negativos.");
    return;
  }

  try {

    await db.collection("confrontos").doc(idJogo).update({
      golsMandante: golsM,
      golsVisitante: golsV,
      golsCasa: golsM,
      golsVisitante: golsV,
      status: "finalizado"
    });

    mostrarToast("Resultado registrado!", "success");
    await renderizarConfrontos();
    await renderizarClassificacao();

  } catch (error) {
    console.error("Erro ao salvar resultado:", error);
    mostrarToast("Erro ao salvar resultado no banco.", "error");
  }
}

async function reiniciarCampeonato() {
  const confirmar = confirm(
    "Tem certeza que deseja apagar todos os confrontos?",
  );
  if (!confirmar) return;

  try {
    const snapshot = await db.collection("confrontos").get();
    const batch = db.batch();

    snapshot.forEach((doc) => batch.delete(doc.ref));
    await batch.commit();

    await renderizarConfrontos();

    if (typeof renderizarClassificacao === "function") {
      renderizarClassificacao();
    }

    mostrarToast("Campeonato reiniciado!", "warning");
  } catch (error) {
    console.error("Erro ao reiniciar:", error);
    mostrarToast("Erro ao limpar confrontos.", "error");
  }
}
