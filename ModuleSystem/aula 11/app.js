// IMPORTING NPM MODULES

// Aqui vamos importar o module validator a fim
// praticar como podemos importar modulos da
// pagina do NPM

// No terminal vamos executar o comando "npm init"
/** para criar o arquivo package.json que será o responsavel
 * por armanezar as dependencias do nosso projeto
 * Depois vamos instalar o pacote que queremos usar 
 * usando o comando npm i "nome do pacote"
 */

const validator = require('validator')

// console.log(validator.isEmail('igorfonseca@gmail.com'))
// console.log(validator.contains('Meu nome é gal', 'Maria', {minOccurrences: 1}))
console.log(validator.equals('senha1', 'senha1'))