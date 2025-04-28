require('dotenv').config()

const express = require('express')
const { Server } = require('socket.io')
const path = require('path')
const http = require('http')

const { generateMessage } = require('./src/utils/message')

// Managing users
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


    socket.on('warning', (username) => {
        // console.log(username)
        socket.broadcast.emit('warning', generateMessage(`${username} entrou na sala`))
    })


    /** Esse escutado */
    socket.on('connected', ({ username, sala }) => {
        // console.log(username)
        socket.join(sala)
        socket.broadcast.to(sala).emit('connected', username)
    })


    // Criando sala com socket
    /** Aqui usamos o método .join() para criar uma sala, ou seja, usamos o join para agrupar sockets numa sala
     * permitindo enviar e receber mensagem dentro de uma sala. Para podermos garantir que as mensagens enviadas
     * serão recebidas somente por usuários conectados aquela sala, usamos o método .to(nome da sala) para isso.
     * O atributo broadcast é usado para garantir que o emissor não receba a mensagem quee ele mesmo enviou, 
     * mas que todos os demais da sala sim.
     * 
     * o error e user são retornados do arquivo user.js que criamos para podemos gerenciar usuários online,
     * remove-los e até obter os usuários da sala.
     */

    socket.on('join', (options, callback) => {

        const { error, user } = addUser({ id: socket.id, ...options })

        if (error) {
            return callback(error)
        }

        socket.join(user.sala)
        socket.broadcast.to(user.sala).emit('message', generateMessage(`${user.username} entrou!`))
    })

    /** Aqui criei um escutador que ouve o evento de input de algum usúarios e por meio do
     * broadcast, emito um evento para todos os outros usúarios conectados
     */
    socket.on('digitando', () => {
        socket.broadcast.emit('digitando')
    })

    /** Aqui criei um ouvinte para o evento de desconexão, ou seja, quando algum usuário sair da aplicação
     * o evento será disparado do lado do cliente e capturado do lado no escutados abaixo, emitindo um alerta 
     * a todos os usuários conectados na aplicação, mesmo os que estiverem fora da sala, uma vez que não estou usando
     * o .to(nome da sala) para que essa info fose passada somente para os membros da sala.
     */

    socket.on('disconnect', () => {

        const user = removeUser(socket.id)

        if (user) {
            io.to(user.room).emit('warning', generateMessage(`${user.name} saiu!`))
        }

        console.log('usuário saiu')

    })


    // Emissores
    socket.emit('greating', generateMessage('Bem vindo a nosso chat'))
    io.emit('warning', `Conectados: ${io.engine.clientsCount}`)

})

server.listen(port, () => {
    console.log('Servidor on')
    console.log(`http://localhost:${port}`)
})

