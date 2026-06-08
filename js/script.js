let times = [];
let confrontos = [];

const inputNome = document.getElementById("nomeTime");
const btnCadastrar = document.getElementById("btnCadastrar");
const listaTimes = document.getElementById("listaTimes");
const totalTimes = document.getElementById("total-times");
const btnSortear = document.getElementById("btnSortear");
const listaConfrontos = document.getElementById("listaConfrontos");
const totalRodadas = document.getElementById("total-rodadas");

btnCadastrar.addEventListener("click", cadastrarTimes);
btnSortear.addEventListener("click", gerarCampeonato);

function cadastrarTimes() {
    const nome = inputNome.value.trim();

    if (nome === "") {
        alert("Digite o nome do time");
        return;
    }

    times.push({
        id: Date.now(),
        nome: nome
    });

    inputNome.value = "";

    renderizarTimes();
}

function renderizarTimes() {
    listaTimes.innerHTML = "";
    times.forEach((time, index) => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${time.nome}</td>
            <td>
                <button onclick="editarTime(${time.id})">
                    Editar
                </button>

                <button onclick="removerTime(${time.id})">
                    Excluir
                </button>
            </td>
        `;

        listaTimes.appendChild(tr);
    });
    totalTimes.textContent = times.length;
}

function removerTime(id) {
    times = times.filter(time => time.id !== id);

    renderizarTimes();
}

function editarTime(id) {

    const time = times.find(t => t.id === id);

    const novoNome = prompt(
        "Digite o novo nome do time:",
        time.nome
    );

    if (!novoNome) return;

    time.nome = novoNome.trim();

    renderizarTimes();
}

function sortearConfrontos() {
    confrontos = [];

    const timesEmbaralhados = [...times];
    timesEmbaralhados.sort(() => Math.random() - 0.5);

    for (let i = 0; i < timesEmbaralhados.length; i += 2) {
        if (timesEmbaralhados[i + 1]) {
            confrontos.push({
                mandante: timesEmbaralhados[i].nome,
                visitante: timesEmbaralhados[i + 1].nome
            });
        }
    }
    renderizarConfrontos();
}
function renderizarConfrontos() {
    listaConfrontos.innerHTML = "";
    confrontos.forEach((confronto, index) => {

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
        listaConfrontos.appendChild(tr)
    });
    document.getElementById("total-jogos").textContent = confrontos.length;
}
function gerarCampeonato() {
    confrontos = [];

    for (let i = 0; i < times.length; i++) {

        for (let j = i + 1; j < times.length; j++) {

            confrontos.push({
                mandante: times[i].nome,
                visitante: times[j].nome,
                golsMandante: null,
                golsVisitante: null
            });

        }
    }
    let rodadas;

    if (times.length % 2 === 0) {
        rodadas = times.length - 1
    }
    else {
        rodadas = times.length;
    }
    totalRodadas.textContent = rodadas;

    renderizarConfrontos();
}

function lancarResultado(index) {

    const golsMandante = Number(
        prompt("Gols do mandante:")
    );

    const golsVisitante = Number(
        prompt("Gols do visitante:")
    );

    confrontos[index].golsMandante = golsMandante;
    confrontos[index].golsVisitante = golsVisitante;

    renderizarConfrontos();
}