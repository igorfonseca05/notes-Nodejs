const express = require('express')

const app = express()

const port = process.env.port || 3000


// 1° Importando Routes
const router = require('./src/routes/index')

app.get('/', (req, res) => {
    res.send('Bem vindo a API')
})

app.use(router)

app.listen(port, () => {
    console.log('servidor ON')
    console.log('Acesse em http://localhost:3000')
})



