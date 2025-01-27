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
app.use(express.json())
app.use(express.urlencoded({ extended: true }))



app.use('/', routes)
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