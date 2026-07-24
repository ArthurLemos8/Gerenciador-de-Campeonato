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