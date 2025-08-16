const path = require('path')


// console.log(__dirname)
// console.log( __filename)

// console.log(path.join(__dirname, '..', 'index.js'))
// console.log('obter nome arquivo', path.basename(__filename))

function obterNome() {
    const fileName = path.basename(__filename)
    const ex = path.extname(__filename)
    console.log(fileName)
}

function getextension() {
    console.log(ex)
}

getextension()


// obterNome()