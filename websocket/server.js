require('dotenv').config()

const express = require('express')
const { Server } = require('socket.io')
const path = require('path')
const http = require('http')

const { generateMessage } = require('./src/utils/message')

const { addUser, getUser, getUsersInRoom, removeUser } = require('./src/utils/users')


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
        // socket.join(message.sala)


        callback('recebido')
        if (data.message === '') return

        // Emitindo messagem para membros da sala
        io.to(message.sala).emit('message', data)
    })

    // Ouvintes
    socket.on('location', (message) => {
        const coords = generateMessage(`http://google.com/maps?q=${message.latitude},${message.longitude}`)
        io.emit('location', { id: socket.id, ...coords })
    })


    socket.on('disconnect', () => {
        io.emit('warning', generateMessage('Usuário saiu'))
    })

    socket.on('warning', (username) => {
        // console.log(username)
        socket.broadcast.emit('warning', generateMessage(`${username} entrou na sala`))
    })

    socket.on('connected', ({ username, sala }) => {
        // console.log(username)
        socket.join(sala)
        socket.broadcast.to(sala).emit('connected', username)
    })

    // Criando sala com socket
    socket.on('join', ({ username, sala }) => {
        socket.join(sala)

        socket.broadcast.to(sala).emit('message', generateMessage(`${username} entrou!`))

    })

    socket.on('digitando', () => {
        socket.broadcast.emit('digitando')
    })

    // Emissores
    socket.emit('greating', generateMessage('Bem vindo a nosso chat'))
    io.emit('warning', `Conectados: ${io.engine.clientsCount}`)

})

server.listen(port, () => {
    console.log('Servidor on')
    console.log(`http://localhost:${port}`)
})

