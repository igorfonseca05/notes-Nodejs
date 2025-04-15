
const express = require('express')
const path = require('path')

const app = express();
const port = process.env.PORT || 5000


app.get('/', (req, res) => {
    res.sendFile('chat.html', { root: path.join(__dirname, 'pages') })
})



app.listen(port, () => {
    console.log(`Servidor ON: http://localhost:${port}`)
})