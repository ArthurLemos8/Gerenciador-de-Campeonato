let times = [];
let confrontos = [];

const inputNome = document.getElementById("nomeTime");
const btnCadastrar = document.getElementById("btnCadastrar");
const listaTimes = document.getElementById("listaTimes");
const totalTimes = document.getElementById("total-times");
const btnSortear = document.getElementById("btnSortear");
const listaConfrontos = document.getElementById("listaConfrontos");
const totalRodadas = document.getElementById("total-rodadas");
const listaClassificacao = document.getElementById("listaClassificacao");

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
    
    salvarDados();
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

    salvarDados();
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

    salvarDados();
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
    
    salvarDados();
    renderizarConfrontos();
    renderizarClassificacao();
}

function lancarResultado(index) {

   if(
        confrontos[index].golsMandante !== null &&
        confrontos[index].golsVisitante !== null
    ){
        const confirmar = confirm(
            "Esse jogo já possui resultado. Deseja alterar?"
        );

        if(!confirmar){
            return;
        }
    }

    const golsMandante = prompt("Gols do mandante:");

    if(golsMandante === null){
        return;
    }

    const golsVisitante = prompt("Gols do visitante:");

    if(golsVisitante === null){
        return;
    }

    confrontos[index].golsMandante = Number(golsMandante);
    confrontos[index].golsVisitante = Number(golsVisitante);

    salvarDados();
    renderizarConfrontos();
    renderizarClassificacao();
}

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

        if(confronto.golsMandante === null) return;

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

        if(confronto.golsMandante > confronto.golsVisitante){

            mandante.vitorias++;
            visitante.derrotas++;

            mandante.pontos += 3;

        }else if(confronto.golsMandante < confronto.golsVisitante){

            visitante.vitorias++;
            mandante.derrotas++;

            visitante.pontos += 3;

        }else{

            mandante.empates++;
            visitante.empates++;

            mandante.pontos += 1;
            visitante.pontos += 1;
        }

    });

    classificacao.forEach(time => {
        time.sg = time.gp - time.gc;
    });

    classificacao.sort((a,b)=>
        b.pontos - a.pontos ||
        b.sg - a.sg ||
        b.gp - a.gp
    );

    classificacao.forEach((time,index)=>{

        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${index+1}</td>
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
function salvarDados(){

    localStorage.setItem("times", JSON.stringify(times));
    localStorage.setItem("confrontos", JSON.stringify(confrontos))
}

function carregarDados(){
    const timeSalvos = localStorage.getItem("times");
    const confrontosSalvos = localStorage.getItem("confrontos");

    if(confrontosSalvos){
        confrontos = JSON.parse(confrontosSalvos);
    }
    if(timeSalvos){
    times = JSON.parse(timeSalvos);
    }
    renderizarTimes();
    renderizarConfrontos();
    renderizarClassificacao();
}

carregarDados();