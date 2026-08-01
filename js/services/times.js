function converterImagemParaBase64(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      resolve(""); 
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

async function cadastrarTimes() {
  const nome = inputNome.value.trim();
  const arquivoImagem = inputEscudo.files[0];

  if (nome === "") {
    mostrarToast("Digite o nome do time.", "error");
    return;
  }

  try {
    const escudoBase64 = await converterImagemParaBase64(arquivoImagem);

    await BancoService.times.salvar(nome, escudoBase64);

    mostrarToast("Time cadastrado com sucesso!", "success");

    inputNome.value = "";
    inputEscudo.value = "";

    renderizarTimes();

  } catch (error) {
    console.error(error);
    mostrarToast("Erro ao cadastrar time no banco.", "error");
  }
}


async function renderizarTimes() {
  if (!listaTimes) return;

  try {
    const timesDoBanco = await BancoService.times.listarTodos();

    listaTimes.innerHTML = "";
    
    timesDoBanco.forEach((time, index) => {
      const urlImagem = time.escudoUrl || time.escudo;
      const escudoHTML = urlImagem
        ? `<img src="${urlImagem}" class="escudo-time-img" alt="${time.nome}">`
        : `<div class="escudo-placeholder"><i data-lucide="shield"></i></div>`;
      
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td class="col-num">${index + 1}</td>
        <td class="col-escudo">${escudoHTML}</td>
        <td class="col-nome-td">${time.nome}</td>
        <td class="col-acoes">
          <button onclick="editarTime('${time.id}', '${time.nome}')" title="Editar">
            <i data-lucide="pencil"></i>
          </button>
          <button onclick="removerTime('${time.id}')" title="Excluir">
            <i data-lucide="trash-2"></i>
          </button>
        </td>
      `;

      listaTimes.appendChild(tr);
    });

    const elTotalTimes = document.getElementById("total-times");
    if (elTotalTimes) {
      elTotalTimes.textContent = timesDoBanco.length;
    }

    if (window.lucide) {
      lucide.createIcons();
    }

  } catch (error) {
    console.error("Erro ao carregar times:", error);
    mostrarToast("Erro ao carregar lista de times.", "error");
  }
}

async function removerTime(id) {
  if (confirm("Tem certeza que deseja excluir este time?")) {
    try {
      await BancoService.times.deletar(id);
      renderizarTimes();
      mostrarToast("Time removido!", "warning");
    } catch (error) {
      mostrarToast("Erro ao remover time.", "error");
    }
  }
}

async function editarTime(id, nomeAtual) {
  const novoNome = prompt("Digite o novo nome do time:", nomeAtual);

  if (!novoNome || novoNome.trim() === "") return;

  try {
    await db.collection("times").doc(id).update({
      nome: novoNome.trim()
    });

    renderizarTimes();
    mostrarToast("Time atualizado!", "info");
  } catch (error) {
    console.error("Erro ao editar time:", error);
    mostrarToast("Erro ao atualizar time.", "error");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderizarTimes();
});