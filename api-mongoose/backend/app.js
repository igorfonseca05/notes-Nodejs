require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()

// Routes
const routes = require('./src/routes/routes')

// Database Connection
require('./src/db/dbConnection')

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}))

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Bem vindo ao servidor' })
})

app.use(routes)

module.exports = app
