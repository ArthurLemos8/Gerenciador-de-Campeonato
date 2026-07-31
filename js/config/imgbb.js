const IMGBB_API_KEY = "2085240aa5c638c8bdf4ed3c7967aa0c"; 

async function fazerUploadEscudo(arquivoImagem) {
    if (!arquivoImagem) return "";

    const formData = new FormData();
    formData.append("image", arquivoImagem);

    try {
        const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
            method: "POST",
            body: formData
        });

        const resultado = await response.json();
        if (resultado.success) {
            return resultado.data.url; 
        } else {
            console.error("Erro no ImgBB:", resultado);
            return "";
        }
    } catch (erro) {
        console.error("Erro ao enviar imagem:", erro);
        return "";
    }
}