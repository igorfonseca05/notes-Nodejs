const fs = require("fs");
const path = require("path");
const {Transform} = require('stream')

const dataPath = path.join(__dirname, "file", "data.csv");
const outputPath = path.join(__dirname, 'file', 'output.json')

const readStream = fs.createReadStream(dataPath, { encoding: "utf-8" });
const writeStream = fs.createWriteStream(outputPath)

function createJSON(csvFile) {
  const Arraylines = csvFile.split("\n");

  const jsonFiels = Arraylines[0].split(",");

  const file = Arraylines.slice(1).map((item, index) => {
      const jsonValuesArray = item.split(',')
    let data = {}

    jsonFiels.forEach((jsonField, i) => {
        data[jsonField] = jsonValuesArray[i]
    });

    return data
  })

  return file
}

let total = 0;
let buffer = "";

readStream.on("data", (chunck) => {
  buffer += chunck;
  const linhas = buffer.split("\n");
 
  for (let linha of linhas) {
      total++;

    if (total >= 1000) {
      readStream.destroy();
      break
    }
  }
});

const data = new Transform({
    transform(chunck, encoding, callback) {
        this.push(JSON.stringify(createJSON(chunck.toString())))
        callback()
    }
})

readStream.pipe(data).pipe(writeStream)

readStream.on("end", () => {
    console.log("Arquivo lido com sucesso");
});

readStream.on("error", (error) => {
    console.log("Houve algum erro na leitura do arquivo", error.message);
});


writeStream.on('finish', () => {
    console.log('Escrita concluida')
})