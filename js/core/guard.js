
auth.onAuthStateChanged((usuario) => {
    if (!usuario) {
        window.location.href = "login.html";
    } else {
        document.body.style.display = "block";
        console.log("Usuário autenticado:", usuario.email);
    }
});