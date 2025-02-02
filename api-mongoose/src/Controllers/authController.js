
const User = require('../Models/userModel')


exports.getUsers = async (req, res) => {
    res.send('oi')
}

exports.signup = async (req, res) => {
    try {

        const user = new User({ ...req.body })

        try {
            await user.save()
            res.status(200).json({ message: "Usuário criado com sucesso" })

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