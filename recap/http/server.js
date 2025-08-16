const http = require('http')

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'Text/plain'})
    res.end('oi')
})

const port = 3000

server.listen(port, () => {
    console.log('Servidor on')
})