
const yargs = require('yargs')
// console.log('Oi meu nome é igor')


// const command = process.argv[2]

// if(command === 'npm') {
//     console.log('Instalando pacote')
// } else {
//     console.log('Verifique seu comando')
// }


// Aula 16 - converterndo argumento com o yargs


console.log(process.argv)


yargs.command({
    command: 'add', 
    describe: 'Adicionando novo dados',
    handler: function () {
        console.log('Adicionei novo dado')
    }
})

yargs.command({
    command:'greet',
    describe: 'Suadar usuário',
    builder: {
        name: {
            describe: 'Name of the person',
            demandOption: true,
            type: 'string'
        }
    },

    handler: function (argv) {
        console.log(`Bem vinde, ${argv.name}` )
    }
})

// console.log(yargs.argv)