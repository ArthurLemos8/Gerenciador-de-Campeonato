const BancoService = {

  times: {
  
    async salvar(nome, urlEscudo = "") {
      try {
        const docRef = await db.collection("times").add({
          nome: nome,
          escudoUrl: urlEscudo || "https://via.placeholder.com/150",
          criadoEm: firebase.firestore.FieldValue.serverTimestamp()
        });
        console.log("Time cadastrado com sucesso! ID:", docRef.id);
        return docRef.id;
      } catch (error) {
        console.error("Erro ao salvar time:", error);
        throw error;
      }
    },


    async listarTodos() {
      try {
        const snapshot = await db.collection("times").orderBy("nome", "asc").get();
        const times = [];
        snapshot.forEach((doc) => {
          times.push({ id: doc.id, ...doc.data() });
        });
        return times;
      } catch (error) {
        console.error("Erro ao buscar times:", error);
        throw error;
      }
    },

    async deletar(id) {
      try {
        await db.collection("times").doc(id).delete();
        console.log("Time removido do banco:", id);
      } catch (error) {
        console.error("Erro ao deletar time:", error);
        throw error;
      }
    }
  },


  confrontos: {
 async salvarJogos(listaDeJogos) {
  const batch = db.batch();
  const antigos = await db.collection("confrontos").get();
  antigos.forEach((doc) => batch.delete(doc.ref));

  listaDeJogos.forEach((jogo) => {
    const docRef = db.collection("confrontos").doc();
    batch.set(docRef, jogo);
  });

  await batch.commit();
},


    async listarTodos() {
      try {
        const snapshot = await db.collection("confrontos").get();
        const jogos = [];
        snapshot.forEach((doc) => {
          jogos.push({ id: doc.id, ...doc.data() });
        });
        return jogos;
      } catch (error) {
        console.error("Erro ao listar confrontos:", error);
        throw error;
      }
    }
  }
};