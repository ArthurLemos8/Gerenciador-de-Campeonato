
auth.onAuthStateChanged((usuario) => {
    if (!usuario) {
        window.location.href = "login.html";
    } else {
        document.body.style.display = "block";
        console.log("Usuário autenticado:", usuario.email);
    }
});


if (btnSair) {
  btnSair.addEventListener("click", () => {
    const confirmar = confirm("Deseja realmente sair da conta?");
    
    if (confirmar) {
      firebase.auth().signOut()
        .then(() => {
          console.log("Usuário deslogado com sucesso!");
          window.location.href = "login.html";
        })
        .catch((error) => {
          console.error("Erro ao deslogar:", error);
          alert("Ops! Houve um erro ao tentar sair.");
        });
    }
  });
}