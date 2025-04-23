require('dotenv').config()

const express = require('express')
const { Server } = require('socket.io')
const path = require('path')
const http = require('http')

const { generateMessage } = require('./src/utils/message')


const app = express()
const server = http.createServer(app)
const io = new Server(server)


const port = 5000 || process.env.PORT

// middlewares
app.use(express.static(path.join(__dirname, 'pages', 'home')))
app.use('/chat', express.static(path.join(__dirname, 'pages', 'chat')));


app.get('/chat', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages/chat/chat.html'))
})


io.on('connection', (socket) => {
    console.log('Nova conexão websocket, id:', socket.id)

    // Ouvintes
    socket.on('message', (message, callback) => {

        const data = {
            id: socket.id,
            message: generateMessage(message).message.msg,
            createdAt: generateMessage(message).createdAt
        }

        callback('recebido')
        if (data.message === '') return

        io.emit('message', data)
    })

    // Ouvintes
    socket.on('location', (message) => {
        const coords = generateMessage(`http://google.com/maps?q=${message.latitude},${message.longitude}`)
        io.emit('location', { id: socket.id, ...coords })
    })



    socket.on('disconnect', () => {
        io.emit('warning', generateMessage('Usuário saiu'))
    })


    // Emissores
    socket.emit('greating', generateMessage('Bem vindo a nosso chat'))
    socket.broadcast.emit('warning', generateMessage('Um novo usuário entrou'))
    io.emit('warning', `Conectados: ${io.engine.clientsCount}`)

})

server.listen(port, () => {
    console.log('Servidor on')
    console.log(`http://localhost:${port}`)
})

