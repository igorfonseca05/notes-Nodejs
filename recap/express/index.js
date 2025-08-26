const express = require('express')

const app = express()

app.get('/', (req, res) => {
    res.send('Bem vindo ao servidor')
})

app.get('/:id', (req, res) => {
    console.log(req.params.id)
    res.send(`Voce enviou o parametro`, req.params.id)
})


app.listen(3000, () => {
    console.log('Servidor on')
})