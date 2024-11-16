require('dotenv').config()

const express = require('express')
const routes = require('./src/routes/routes')
const app = express()


// Base de dados
const { getDbConnection, dbEvents } = require('./Database')
// getDbConnection(process.env.URL_CONNECTION)
getDbConnection(process.env.URL_CONNECTION_2)


// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Minhas rotas
app.use(routes)


// servidor
dbEvents.on('connected', () => {
    app.listen(3000, () => {
        console.log('servidor ON')
        console.log('http://localhost:3000')
    })
})
