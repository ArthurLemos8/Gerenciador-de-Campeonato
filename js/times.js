function cadastrarTimes() {
    const nome = inputNome.value.trim();

   if (nome === "") {
    mostrarToast("Digite o nome do time.", "error");
    return;
}

    times.push({
        id: Date.now(),
        nome: nome
    });

    mostrarToast("Time cadastrado com sucesso!", "success");

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
                    <i data-lucide="pencil"></i>
                </button>

                <button onclick="removerTime(${time.id})">
                   <i data-lucide="trash-2"></i>
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
    mostrarToast("Time removido!", "warning");
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
    mostrarToast("Time atualizado!", "info");
}