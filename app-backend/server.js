const express = require("express");

const app = express();
const PORT = 3000;

// Rota principal
app.get("/", (req, res) => {
  res.send("Aplicação web funcionando");
});

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP",
    service: "app-backend"
  });
});

// Simulação de lentidão real
app.get("/slow", (req, res) => {
  const delay = Number(req.query.delay) || 5000;

  setTimeout(() => {
    res.status(200).json({
      status: "OK",
      delay: `${delay}ms`
    });
  }, delay);
});

// Simulação de erro HTTP 500
app.get("/error", (req, res) => {
  res.status(500).json({
    status: "ERROR",
    message: "Erro interno simulado para teste de monitoramento"
  });
});

app.listen(PORT, () => {
  console.log(`App backend rodando na porta ${PORT}`);
});