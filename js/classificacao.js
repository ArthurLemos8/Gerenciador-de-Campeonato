function renderizarClassificacao() {

    listaClassificacao.innerHTML = "";

    const classificacao = times.map(time => ({
        nome: time.nome,
        pontos: 0,
        jogos: 0,
        vitorias: 0,
        empates: 0,
        derrotas: 0,
        gp: 0,
        gc: 0,
        sg: 0
    }));

    confrontos.forEach(confronto => {

        if (confronto.golsMandante === null) return;

        const mandante = classificacao.find(
            t => t.nome === confronto.mandante
        );

        const visitante = classificacao.find(
            t => t.nome === confronto.visitante
        );

        mandante.jogos++;
        visitante.jogos++;

        mandante.gp += confronto.golsMandante;
        mandante.gc += confronto.golsVisitante;

        visitante.gp += confronto.golsVisitante;
        visitante.gc += confronto.golsMandante;

        if (confronto.golsMandante > confronto.golsVisitante) {

            mandante.vitorias++;
            visitante.derrotas++;

            mandante.pontos += 3;

        } else if (confronto.golsMandante < confronto.golsVisitante) {

            visitante.vitorias++;
            mandante.derrotas++;

            visitante.pontos += 3;

        } else {

            mandante.empates++;
            visitante.empates++;

            mandante.pontos += 1;
            visitante.pontos += 1;
        }

    });

    classificacao.forEach(time => {
        time.sg = time.gp - time.gc;
    });

    classificacao.sort((a, b) =>
        b.pontos - a.pontos ||
        b.sg - a.sg ||
        b.gp - a.gp
    );

    let melhorAtaque = classificacao[0];
    let melhorDefesa = classificacao[0];

    classificacao.forEach(time => {

        if (time.gp > melhorAtaque.gp) {
            melhorAtaque = time;
        }

        if (time.gc < melhorDefesa.gc) {
            melhorDefesa = time;
        }

    });
    cardMelhorAtaque.textContent =`${melhorAtaque.nome} (${melhorAtaque.gp} gols)`;

    cardMelhorDefesa.textContent =  `${melhorDefesa.nome} (${melhorDefesa.gc} sofridos)`;

    classificacao.forEach((time, index) => {

        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${time.nome}</td>
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

}