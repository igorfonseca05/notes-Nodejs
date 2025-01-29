require('dotenv').config()
const express = require('express')

const app = express()

// server config
const port = process.env.port || 3000

// custom Modules
const { dbConnection, dbEvents } = require('./src/db/dbConnection')

dbConnection()

// models
const userData = require('./src/model/userModel')

// routes
const routes = require('./src/routes/routes')


// middlewares
app.use((req, res, next) => {
    res.status(503).send("O site está me manutenção, tente novamente em alguns minutos")
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))



app.use(routes)
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Bem vindo ao servidor' })
})


dbEvents.on('connected', () => {
    console.log('Base conectada')
    app.listen(port, () => {
        console.log('Servidor On')
        console.log('Acesse em http://localhost:3000')
    })
})


// const argon2 = require('argon2')

// const hashingPassword = async () => {

//     const password = '123456Igor'
//     const password2 = '123456Igor'

//     const hashedPassword = await argon2.hash(password, 8)

//     // console.log(hashedPassword, password)

//     const isEqual = await argon2.verify(hashedPassword, password2)

//     console.log(isEqual)

// }

// hashingPassword()


// const jwt = require('jsonwebtoken')

// function getToken() {

//     const secret_jwt = 'YJXmlth281KwTz8M1anDalrwzXNmBlEWeoOZXkq4mek='

//     const token = jwt.sign({ name: 'igor' }, secret_jwt, { expiresIn: '1h' })

//     console.log(jwt.decode(token))

// }

// getToken()