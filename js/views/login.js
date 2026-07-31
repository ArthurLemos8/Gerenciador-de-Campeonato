const formAuth = document.getElementById("formAuth");
const emailAuth = document.getElementById("emailAuth");
const senhaAuth = document.getElementById("senhaAuth");
const btnAuthSubmit = document.getElementById("btnAuthSubmit");
const tituloAuth = document.getElementById("tituloAuth");
const textoAlternarAuth = document.getElementById("textoAlternarAuth");

let modoCadastro = false;

document.addEventListener("click", (e) => {
    if (e.target && e.target.id === "linkAlternarAuth") {
        e.preventDefault();
        modoCadastro = !modoCadastro;

        if (modoCadastro) {
            tituloAuth.textContent = "Criar Conta no PlayScore";
            btnAuthSubmit.textContent = "Cadastrar";
            textoAlternarAuth.innerHTML = 'Já tem uma conta? <a href="#" id="linkAlternarAuth">Fazer Login</a>';
        } else {
            tituloAuth.textContent = "Entrar no PlayScore";
            btnAuthSubmit.textContent = "Entrar";
            textoAlternarAuth.innerHTML = 'Não tem uma conta? <a href="#" id="linkAlternarAuth">Cadastre-se</a>';
        }
    }
});


formAuth.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = emailAuth.value;
    const senha = senhaAuth.value;

    try {
        if (modoCadastro) {
            await auth.createUserWithEmailAndPassword(email, senha);
            alert("Conta criada com sucesso!");
        } else {
            await auth.signInWithEmailAndPassword(email, senha);
        }
        window.location.href = "index.html";
    } catch (erro) {
        console.error("Erro:", erro);
        alert("Erro: " + erro.message);
    }
});


auth.onAuthStateChanged((usuario) => {
    if (usuario) {
        window.location.href = "index.html";
    }
});