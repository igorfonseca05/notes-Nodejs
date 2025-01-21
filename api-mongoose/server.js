require('dotenv').config()

const express = require('express')

const app = express()

// custom Modules
const { dbConnection, dbEvents } = require('./src/db/dbConnection')

dbConnection()


// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get('/', (req, res) => {
    res.status(200).json({ message: 'Bem vindo ao servidor' })
})

app.post('/signup', (req, res) => {

    const { name, email, password } = req.body

    console.log(name, email, password)

})




dbEvents.on('connected', () => {
    console.log('Base conectada')
    app.listen(3000, () => {
        console.log('Servidor On')
        console.log('Acesse em http://localhost:3000')
    })
})