
const argon2 = require('argon2')

const userModel = require('../model/userModel')


exports.signUp = async (req, res) => {

    const { userName, email, password } = req.body

    const newUser = new userData({ userName, email, password })

    try {

        await newUser.save()

        return res.json({
            messagem: 'Usúario criado com sucesso',
            newUser
        })

    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }

}
exports.signUp = async (req, res) => {

    const { userName, email, password } = req.body

    const newUser = new userData({ userName, email, password })

    try {

        await newUser.save()

        return res.json({
            messagem: 'Usúario criado com sucesso',
            newUser
        })

    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }

}

exports.signIn = async (req, res) => {

    const { email, password } = req.body

    try {

        const user = await userModel.findOne({ email })

        if (!user) throw new Error('Usuário não cadastrado')

        const isValid = await argon2.verify(user.password, password)

        if (!isValid) throw new Error('Senha inválida')

        return res.status(200).json({
            success: true,
            message: "Login realizado com sucesso.",
            user
        })

    } catch (error) {

        return res.status(404).json({
            success: false,
            message: error.message,
            user: null
        })

    }
}