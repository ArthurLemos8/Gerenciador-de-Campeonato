function mostrarToast(mensagem, tipo = "success") {

    let cor;

    switch (tipo) {
        case "success":
            cor = "#22c55e";
            break;

        case "error":
            cor = "#ef4444";
            break;

        case "warning":
            cor = "#f59e0b";
            break;

        case "info":
            cor = "#3b82f6";
            break;

        default:
            cor = "#64748b";
    }

    Toastify({
        text: mensagem,
        duration: 3000,
        gravity: "top",
        position: "right",
        close: true,
        stopOnFocus: true,
        style: {
            background: cor,
            borderRadius: "8px"
        }
    }).showToast();
}