const EventEmmitter = require('events')


const emmitter = new EventEmmitter()

emmitter.on('mensagem', (data) => {
    console.log('Mensagem recebida', data)
})


emmitter.emit('mensagem','Processo concluido')