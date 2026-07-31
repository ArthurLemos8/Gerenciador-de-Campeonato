function atualizarDashboard() {
  const elTotalTimes = document.getElementById("total-times");
  const elTotalJogos = document.getElementById("total-jogos");

  if (elTotalTimes) {
    elTotalTimes.textContent = times ? times.length : 0;
  }

  if (elTotalJogos) {
    elTotalJogos.textContent = confrontos ? confrontos.length : 0;
  }
}