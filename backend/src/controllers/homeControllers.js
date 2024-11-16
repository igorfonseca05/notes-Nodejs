const dishes = require('../model/dbModel')
const path = require('path')

const validator = require('validator')

const dados = dishes.find()
    .then(res => {
        return res
    }).catch((error => {
        console.log(error)
    }))

exports.home = (req, res) => {
    res.json({ "name": "igor" })
}
exports.aboutController = (req, res) => {
    res.redirect('/teste')
    res.sendFile('about.html', { root: 'C:/Users/Igor/Documents/Repositório/deliveryWebsite/backend/src/views' })
}

exports.teste = (req, res) => {
    res.sendFile('form.html', { root: 'C:/Users/Igor/Documents/Repositório/deliveryWebsite/backend/src/views' })
}


exports.submit = (req, res) => {

    const { name, email, password } = req.body

    if (!name || name.length <= 2) {
        return res.status(404).send('Nome inválido')
    }

    if (!email || !validator.isEmail(email)) {
        return res.status(404).send('Email inválido')
    }

    if (!password || !validator.isLength(password, { min: 6 })) {
        return res.status(404).send('Senha invalida')
    }

    res.send('Dados recebidos')
}