require('dotenv').config()
const express = require('express')

const app = express()

// server config
const port = process.env.port || 3000

// Database Connection
const { dbConnection, dbEvents } = require('./src/db/dbConnection')

dbConnection()

// Routes
const routes = require('./src/routes/routes')

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Bem vindo ao servidor' })
})

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(routes)


// Servidor
dbEvents.on('connected', () => {
    app.listen(port, () => {
        console.log('Servidor On')
        console.log('Acesse em http://localhost:3000')
    })



})

const name = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSWdvciBmb25zZWNhIiwiaWF0IjoxNzM4NjA4MDE3LCJleHAiOjE3MzkyMTI4MTd9.UyXygw439bDKummDTrUYLcp7CKhR-R0PGf3r_pcEqas'

console.log(name.split('.')[0])


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


// Relacionando tabelas

// const taskModel = require('./src/model/taskModel')
// const userData = require('./src/model/userModel')

// async function getTask() {

//     // const task = await taskModel.findById('679b8b0ece680cce52ae63eb')
//     // await task.populate('owner')
//     // console.log(task)

//     const user = await userData.findById('679bb0ddb0da54060a6687f2')
//         .select('-password -tokens')
//         .populate('tasks')

//     console.log(user)
// }

// getTask()


// Estudando attacks por jwt

const jwt = require('jsonwebtoken')


const test = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiaWdvciIsImlhdCI6MTczODYxMzc4NywiZXhwIjoxNzM5MjE4NTg3fQ.zKbsno8nEOOEnsZ3 - 5zvwbeTy647wqq - hrZKboB_JzA'

function token(test) {

    // const token = jwt.sign({ name: 'igor' }, process.env.JWT_SECRET, { expiresIn: '7d' })


    // console.log(JSON.parse(Buffer.from(test.split('.')[0], 'base64').toString()))

    const isValid = jwt.verify(test, process.env.JWT_SECRET, { algorithms: ['HS256'] })

    console.log(isValid)

}

token(test)