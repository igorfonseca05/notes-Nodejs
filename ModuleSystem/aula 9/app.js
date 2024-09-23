const fs = require('fs')

// Aqui é importante notar que trocar a mensagem do arquivo
// apagamos a primeira mensagem que adicionamos e 
// adicionamos a segunda no lugar.
// fs.writeFileSync('notes.txt', '\n Caderno de capa vermelha', { flag: 'a+'})

// fs.appendFileSync('notes.txt', 'Novo dado foi adicionado')

const readed = fs.readFileSync('exemplo.csv')

console.log(readed.toString())

// setTimeout(() => {
//     fs.unlinkSync('notes.txt')
// }, 2000)
