async function renderizarClassificacao() {
  if (!listaClassificacao) return;

  try {
    const timesDoBanco = await BancoService.times.listarTodos();
    const confrontosDoBanco = await BancoService.confrontos.listarTodos();

    if (!timesDoBanco || timesDoBanco.length === 0) {
      listaClassificacao.innerHTML = "";
      return;
    }

    listaClassificacao.innerHTML = "";

    const classificacao = timesDoBanco.map((time) => ({
      nome: time.nome,
      escudo: time.escudoUrl || time.escudo || "",
      pontos: 0,
      jogos: 0,
      vitorias: 0,
      empates: 0,
      derrotas: 0,
      gp: 0,
      gc: 0,
      sg: 0,
    }));

    confrontosDoBanco.forEach((confronto) => {

      const gM = confronto.golsMandante ?? confronto.golsCasa;
      const gV = confronto.golsVisitante ?? confronto.golsVisitante;
      const nomeMandante = confronto.mandante || confronto.timeCasaNome;
      const nomeVisitante = confronto.visitante || confronto.timeVisitanteNome;

      if (gM === null || gM === undefined || gV === null || gV === undefined) return;

      const mandante = classificacao.find((t) => t.nome === nomeMandante);
      const visitante = classificacao.find((t) => t.nome === nomeVisitante);

      if (mandante && visitante) {
        mandante.jogos++;
        visitante.jogos++;

        mandante.gp += gM;
        mandante.gc += gV;

        visitante.gp += gV;
        visitante.gc += gM;

        if (gM > gV) {
          mandante.vitorias++;
          visitante.derrotas++;
          mandante.pontos += 3;
        } else if (gM < gV) {
          visitante.vitorias++;
          mandante.derrotas++;
          visitante.pontos += 3;
        } else {
          mandante.empates++;
          visitante.empates++;
          mandante.pontos += 1;
          visitante.pontos += 1;
        }
      }
    });

    classificacao.forEach((time) => {
      time.sg = time.gp - time.gc;
    });

    classificacao.sort(
      (a, b) => b.pontos - a.pontos || b.sg - a.sg || b.gp - a.gp
    );

    let melhorAtaque = classificacao[0];
    let melhorDefesa = classificacao[0];

    classificacao.forEach((time) => {
      if (time.gp > melhorAtaque.gp) {
        melhorAtaque = time;
      }
      if (time.gc < melhorDefesa.gc) {
        melhorDefesa = time;
      }
    });

    if (typeof cardMelhorAtaque !== "undefined" && cardMelhorAtaque && melhorAtaque && melhorAtaque.nome) {
      cardMelhorAtaque.textContent = `${melhorAtaque.nome} (${melhorAtaque.gp} gols)`;
    }

    if (typeof cardMelhorDefesa !== "undefined" && cardMelhorDefesa && melhorDefesa && melhorDefesa.nome) {
      cardMelhorDefesa.textContent = `${melhorDefesa.nome} (${melhorDefesa.gc} sofridos)`;
    }
    classificacao.forEach((time, index) => {
      const tr = document.createElement("tr");

      const escudoHTML = time.escudo
        ? `<img src="${time.escudo}" class="escudo-time-img" alt="${time.nome}">`
        : `<div class="escudo-placeholder"><i data-lucide="shield"></i></div>`;

      tr.innerHTML = `
        <td>${index + 1}º</td>
        <td class="col-nome-td" style="display: flex; align-items: center; gap: 8px;">
            ${escudoHTML}
            <span>${time.nome}</span>
        </td>
        <td>${time.jogos}</td>
        <td>${time.pontos}</td>
        <td>${time.vitorias}</td>
        <td>${time.empates}</td>
        <td>${time.derrotas}</td>
        <td>${time.gp}</td>
        <td>${time.gc}</td>
        <td>${time.sg}</td>
      `;

      listaClassificacao.appendChild(tr);
    });

    if (window.lucide) {
      lucide.createIcons();
    }

  } catch (error) {
    console.error("Erro ao renderizar classificação:", error);
  }
}