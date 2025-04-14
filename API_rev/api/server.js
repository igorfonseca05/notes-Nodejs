require('dotenv').config()

const express = require('express')

const app = express()

const { connectionDB, closeConnection } = require('./database/dbConfig')


connectionDB()
    .then(() => { app.emit('connected') })
    .catch((error) => { console.log(error) })


app.get('/', (req, res) => {
    res.send('oi')
    res.end()
})


app.on('connected', () => {
    app.listen(3000, () => {
        console.log('SERVIDOR ON')
    })
})