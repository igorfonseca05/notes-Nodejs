
const argon2 = require('argon2')

const userModel = require('../model/userModel')



// Public Routes

exports.signUp = async (req, res) => {

    const { userName, email, password } = req.body

    try {

        // Verificando se usuário já está cadastrado
        const existUser = await userModel.findOne({ email })

        if (existUser) {
            throw new Error('Email já cadastrado')
        }

        const newUser = new userModel({ userName, email, password })
        await newUser.generateAuthToken()


        try {

            await newUser.save()

            return res.status(201).json({
                messagem: 'Usúario criado com sucesso',
                newUser
            })

        } catch (error) {
            return res.status(404).json({
                message: error.message
            })
        }

    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }

}


exports.signIn = async (req, res) => {
    try {

        const user = await userModel.findByCredentials(req.body)

        await user.generateAuthToken()

        return res.status(200).json({
            success: true,
            message: "Login realizado com sucesso.",
            user
        })

    } catch (error) {

        // console.log(error)

        return res.status(404).json({
            success: false,
            message: error.message,
            user: null
        })

    }
}