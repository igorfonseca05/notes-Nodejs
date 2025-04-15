require('dotenv').config()

const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const path = require('path')

const app = express();
const server = http.createServer(app)
const io = new Server(server)

const port = process.env.PORT || 5000
app.use(express.static(path.join(__dirname, 'pages')));


let count = 0

io.on('connection', (socket) => {
    console.log('Nova conexão websocket')

    // Evento emitido pelo server ---> client
    socket.emit('countUpdated', { count })


    // Evento emitido pelo client ---> Server
    socket.on('message', (message) => {
        // count++

        console.log(message)
        const dado = message.message
        // O método socket.emit() retorna somente para quem emitiu o evento
        // socket.emit('countUpdated', { count })

        // O método io.emit() retorna para todos que estão conectados ao servidor
        io.emit('countUpdated', dado)
    })
})


server.listen(port, () => {
    console.log(`Servidor ON: http://localhost:${port}`)
})

