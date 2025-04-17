require('dotenv').config()

const express = require('express')
const { Server } = require('socket.io')
const path = require('path')
const http = require('http')


const app = express()
const server = http.createServer(app)
const io = new Server(server)


const port = 5000 || process.env.PORT



// middlewares
app.use(express.static(path.join(__dirname, 'pages')))


io.on('connection', (socket) => {
    console.log('Nova conexão websocket, id:', socket.id)

    // Ouvintes
    socket.on('message', (message, callback) => {
        const data = {
            id: socket.id,
            message: message.msg
        }

        callback('recebido')
        io.emit('message', data)
    })

    socket.on('sendLocation', (coords) => {
        io.emit('message', `http://google.com/maps?q=${coords.latitude},${coords.longitude}`)
    })

    socket.on('disconnect', () => {
        io.emit('warning', 'Usuário saiu')
    })


    // Emissores
    socket.emit('greating', 'Bem vindo a nosso chat')
    socket.broadcast.emit('warning', 'Um novo usuário entrou')
    io.emit('warning', `Conectados: ${io.engine.clientsCount}`)

})

server.listen(port, () => {
    console.log('Servidor on')
    console.log(`http://localhost:${port}`)
})

