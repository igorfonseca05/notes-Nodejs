const mongoose = require('mongoose')
const User = require('../Models/userModel')

exports.getUsersInfo = async (req, res) => {

    try {

        const user = await User.find()

        if (!user) {
            throw new Error('Não existe usuário cadastrado')
        }

        res.status(200).json({ user })

    } catch (error) {

    }
}


exports.createUser = async (req, res) => {
    res.send('Acessou rota /users')
}
exports.modifyUser = async (req, res) => {
    res.send('Acessou rota /users')
}

exports.deleteUser = async (req, res) => {
    res.send('Acessou rota /users')
}

exports.deleteAll = async (req, res) => {
    try {

        await User.deleteMany()

        res.send('Dados removidos')

    } catch (error) {
        res.send(error)

    }
}