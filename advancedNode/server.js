const cluster = require('cluster')
const os = require('os')

if(cluster.isMaster) {
    cluster.fork();
    cluster.fork();
} else {
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware para aceitar JSON
app.use(express.json());

function doWork(duration) {
    const start = Date.now()
    while(Date.now() - start < duration) {}
}

// Rota GET
app.get('/', (req, res) => {
    doWork(8000)
    res.send('Servidor Express funcionando!');
});

app.get('/teste', (req, res) => {
    res.send('Rota de teste!');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
}