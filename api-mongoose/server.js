require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

const app = express()


// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get('/', (req, res) => {
    res.status(200).json({ message: 'Bem vindo ao servidor' })
})



app.listen(3000, () => {
    console.log('Servidor On')
    console.log('Acesse em http://localhost:3000')
})