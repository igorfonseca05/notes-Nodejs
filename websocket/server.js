require('dotenv').config()

const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const path = require('path')


const app = express();
const server = http.createServer(app)
const io = new Server(server)

const port = process.env.PORT || 5000


app.get('/', (req, res) => {
    res.sendFile('chat.html', { root: path.join(__dirname, 'pages') })
})


io.on('connection', () => {
    console.log('Nova conexão websocket')
})


server.listen(port, () => {
    console.log(`Servidor ON: http://localhost:${port}`)
})

