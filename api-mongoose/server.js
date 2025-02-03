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



// const jwt = require('jsonwebtoken')

// function getToken() {

//     const token = jwt.sign({ name: 'Igor fonseca' }, process.env.JWT_SECRET, { expiresIn: '7d' })

//     // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkVkdWFyZG8iLCJzb2JyZW5vbWUiOiJWaWxlbGEiLCJpYXQiOjE1MTYyMzkwMjJ9.Uu57IdWagtnxQfqklOiglzrbEKhRxqNP0HIzxdsRMts'

//     // const verify = jwt.verify(token, process.env.JWT_SECRET)

//     // console.log(token)
//     // console.log(verify)

// }

// getToken()