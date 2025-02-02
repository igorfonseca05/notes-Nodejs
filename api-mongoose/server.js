require('dotenv').config()

const express = require('express')

const app = express()

const port = process.env.port || 3000

// 2° Conexão com a base de dados
const dbEvent = require('./src/config/DBConnection')


// 3° Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// 1° Importando Routes
const router = require('./src/routes/index')

app.get('/', (req, res) => {
    res.send('Bem vindo a API')
})

app.use(router)

dbEvent.on('connected', () => {
    app.listen(port, () => {
        console.log('servidor ON')
        console.log('Acesse em http://localhost:3000')
    })
})


