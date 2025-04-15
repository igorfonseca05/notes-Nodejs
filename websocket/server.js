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

    socket.on('message', (message) => {
        const data = {
            id: socket.id,
            message: message.msg
        }

        // socket.emit('sent', data)
        io.emit('sent', data)
    })

})



server.listen(port, () => {
    console.log('Servidor on')
    console.log(`http://localhost:${port}`)
})

