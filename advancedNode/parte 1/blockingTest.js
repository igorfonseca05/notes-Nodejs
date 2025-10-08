const { Worker } = require("worker_threads");
const cluster = require("cluster");
const os = require("os");
const path = require("path");
const { fileURLToPath } = require("url");

if(cluster.isMaster) {

    console.log(cluster.isMaster)

    cluster.fork()
    cluster.fork()
    // cluster.fork()
} else {
    const express = require("express");
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  function doWork(duration) {
    const start = Date.now()
    while(Date.now() - start < duration) {}
  }

  app.get("/", (req, res) => {
    doWork(5000)
    res.send('oi')
  });

  app.get("/teste", (req, res) => {
    res.send("Rota de teste!");
  });

  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
}