const fs = require("fs");
const rl = require("readline");

/** Aqui vamos simular a analise de um arquivo muito grande
 * que eu eventualmente poderia ter no toqi. Aqui será um arquivo muito grande sobre
 * os pedidos realizados
 */

// 1° Criando o arquivo

function createFile() {
  console.time("Escrevendo arquivo");

  const fileStream = fs.createWriteStream("orders.txt");

  for (let i = 0; i < 1_000_000; i++) {
    const id = i + 1;
    const produto = ["hamburguer", "batata", "refrigerante"][i % 3];
    const preco = produto === "hamburguer" ? 25 : produto === "batata" ? 10 : 5;

    const text = `${id}; ${produto}; ${preco}`;
    fileStream.write(`${text}\n`);
  }

  console.timeEnd("Escrevendo arquivo");
  fileStream.end(() => console.log("Arquivo criado"));
}

// createFile();

async function proccessLargeFile() {
  console.time("Lendo arquivo");
  const stream = fs.createReadStream("orders.txt");
  const file = rl.createInterface({ input: stream });

  let contador = 0;

  file.on("line", (line) => {
    const [, , preco] = line.split(";");
    contador += Number(preco);
  });

  file.on("close", () => {
    console.log(`O total é ${contador}`);
  });

  console.timeEnd("Lendo arquivo");
}

proccessLargeFile();
