// Converte o arquivo de imagem selecionado no computador para texto Base64
function converterImagemParaBase64(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      resolve(""); // Se não enviou imagem, retorna vazio
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

  const escudoBase64 = await converterImagemParaBase64(arquivoImagem);

  times.push({
    id: Date.now(),
    nome: nome,
    escudo: escudoBase64,
  });

  mostrarToast("Time cadastrado com sucesso!", "success");

  inputNome.value = "";
  inputEscudo.value = "";

  salvarDados();
  renderizarTimes();
}

function renderizarTimes() {
  listaTimes.innerHTML = "";
  times.forEach((time, index) => {
    const escudoHTML = time.escudo
      ? `<img src="${time.escudo}" class="escudo-time-img" alt="${time.nome}">`
      : `<div class="escudo-placeholder"><i data-lucide="shield"></i></div>`;
    const tr = document.createElement("tr");

    tr.innerHTML = `
           <td class="col-num">${index + 1}</td>
      <td class="col-escudo">${escudoHTML}</td>
      <td class="col-nome-td">${time.nome}</td>
      <td class="col-acoes">
        <button onclick="editarTime(${time.id})" title="Editar">
          <i data-lucide="pencil"></i>
        </button>
        <button onclick="removerTime(${time.id})" title="Excluir">
          <i data-lucide="trash-2"></i>
        </button>
      </td>
        `;

    listaTimes.appendChild(tr);
  });
  
const elTotalTimes = document.getElementById("total-times");
if (elTotalTimes) {
    elTotalTimes.textContent = times.length;
}
  if (window.lucide) {
    lucide.createIcons();
  }
}

function removerTime(id) {
  times = times.filter((time) => time.id !== id);

  salvarDados();
  renderizarTimes();
  mostrarToast("Time removido!", "warning");
}

function editarTime(id) {
  const time = times.find((t) => t.id === id);

  const novoNome = prompt("Digite o novo nome do time:", time.nome);

  if (!novoNome) return;

  time.nome = novoNome.trim();

  salvarDados();
  renderizarTimes();
  mostrarToast("Time atualizado!", "info");
}
