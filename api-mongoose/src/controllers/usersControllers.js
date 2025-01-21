
const userData = require('../model/userModel')

exports.userPost = async (req, res) => {

    const { name, email, password } = req.body
    const newUser = new userData({ name, email, password })

    try {
        newUser.save()

        console.log('Usuário criado com sucesso')

    } catch (error) {
        console.log(error._message)
    }

}
exports.getusers = async (req, res) => {

    try {

        const users = await userData.find()

        res.status(200).json({ users })

    } catch (error) {
        console.log(error)
    }

}