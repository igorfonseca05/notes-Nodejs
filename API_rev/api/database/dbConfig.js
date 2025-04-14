
const mongoose = require('mongoose')

let connection

async function connectionDB() {
    if (!connection) {
        connection = await mongoose.connect(process.env.DB_URL)
        return console.log('base conectada')
    }

    return connection
}

async function closeConnection() {
    if (connection) {
        await mongoose.connection.close()
    }
}

mongoose.connection.on('disconnected', () => {
    console.log('Base de dados desconectada. Tentando reconectar...')
})

mongoose.connection.on('reconnected', () => {
    console.log('Base de dados reconectada!')
})

module.exports = { connectionDB, closeConnection }