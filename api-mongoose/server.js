require('dotenv').config()
const express = require('express')

const app = express()

// server config
const port = process.env.port || 3000

// custom Modules
const { dbConnection, dbEvents } = require('./src/db/dbConnection')

dbConnection()

// routes
const routes = require('./src/routes/routes')


// middlewares
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