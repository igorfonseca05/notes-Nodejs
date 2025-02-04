
const mongoose = require('mongoose')
const User = require('../Models/userModel')

const jwt = require('jsonwebtoken')

// Rota para adicionar usuários a base de dados
exports.signup = async (req, res) => {
    try {

        const user = new User({ ...req.body })

        try {
            await user.save()
            res.status(200).json({
                message: "Usuário criado com sucesso",
                user
            })

        } catch (error) {

            if (error.code === 11000) {
                throw new Error('Email de usuário já cadastrado')
            }

            res.status(400).json({ message: error.message })
        }

    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}

exports.login = async (req, res) => {

    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateToken()

        res.status(200).json({ user })


    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}