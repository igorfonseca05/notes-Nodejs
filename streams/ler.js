const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

const input = path.join(__dirname, "teste.csv");

const read = fs.createReadStream(input, "utf8");

let totalAge = 0;

read
  .pipe(csv())
  .on("data", (row) => {
    totalAge += Number(row.user_age);
  })
  .on("end", () => {
    console.log("Leitura Finalizada", { totalAge });
  });
