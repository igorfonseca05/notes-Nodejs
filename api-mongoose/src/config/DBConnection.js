
const mongoose = require('mongoose')
const Event = require('events')

const dbEvent = new Event()

mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log('Conectada')
        dbEvent.emit('connected')
    })
    .catch((erro) => {
        console.log(erro)
    })


module.exports = dbEvent