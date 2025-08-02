const cluster = require('cluster')
const os = require('os')

if(cluster.isMaster) {
    cluster.fork();
    cluster.fork();
} else {
const express = require('express');
const crypto = require('crypto');
const app = express();
const PORT = 3000;

const password = 'minha_senha_super_secreta';
const salt = crypto.randomBytes(16).toString('hex'); // Gera um salt aleatório
const iterations = 100000;
const keylen = 512; // Tamanho do hash em bytes
const digest = 'sha512';

app.use(express.json());


app.get('/', (req, res) => {
    crypto.pbkdf2(password, salt, iterations, keylen, digest, (err, derivedKey) => {
        res.send('Servidor Express funcionando!');
    });
});

app.get('/teste', (req, res) => {
    res.send('Rota de teste!');
});


app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
}