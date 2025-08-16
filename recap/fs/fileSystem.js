
const fs = require('fs')
const path = require('path')

// Vamos criar um novo arquivo

const folderPath = path.join(__dirname, 'Folder')

// Verificar se o arquivo já existe
// if(!fs.existsSync()) {
//     fs.mkdirSync(folderPath)
//     console.log('Arquivo criado')
// } 


// Caminho onde salvar o arquivo
// Criar e escrever o arquivo
const filePath = path.join(folderPath, 'test.txt')
// fs.writeFileSync(filePath, 'console.log(oi)')
// console.log('Arquivo criado na pasta newFile')


// // Podemos ler o arquivo 
// const fileContent = fs.readFileSync(filePath, 'utf-8')
// console.log(fileContent)

// // Podemos adicionar novos dados em arquivos já criados
// fs.appendFileSync(filePath, 'novo dado adicional')


// Versão com callbacks


const res = fs.access(folderPath, (err) => {
    if(!err) return console.log('Arquivo já existe') 

    fs.mkdir(folderPath, (err) => {
        if(err) return console.log('já existe')
        console.log("Arquivo criado com sucesso")
    })
})

 fs.writeFile(filePath, 'Acabei de criar um arquivo txt', (err) => {
    if(err) return console.log(err)
    console.log('arquivo criado com sucesso na pasta Folder')

    fs.appendFile(filePath, '\nlinha adicionada nova', (err) => {
        if(err) return console.log(err)
        console.log('adicionado')
    })
    
    fs.readFile(filePath, 'utf8', (err, data) => {
       if(err) return console.log(err)
       console.log('Conteudo do arquivo:\n', data)
    })

    fs.unlink(filePath, (err) => {
        if(err) return console.log(err)
        console.log('Arquivo removido')
    })
 })


