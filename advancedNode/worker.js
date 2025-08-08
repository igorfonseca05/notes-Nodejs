const { parentPort } = require("worker_threads");

parentPort.on("Message", (msg) => {
  console.log("Mensagem recebida no worker:", msg);
  parentPort.postMessage("Oi, main thread!");
});
