const csv = `nome,idade,email
Igor,30,igor@email.com
Ana,25,ana@email.com
Carlos,40,carlos@email.com
Juliana,28,juliana@email.com
Marcos,35,marcos@email.com
Fernanda,32,fernanda@email.com`;

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

console.log(createJSON(csv));
