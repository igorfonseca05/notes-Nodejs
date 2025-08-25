const express = require('express')

const app = express()

app.get('/', (req, res) => {
    res.send('Bem vindo ao servidor')
})


app.listen(3000, () => {
    console.log('Servidor on')
})