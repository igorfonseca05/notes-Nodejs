
const userData = require('../model/userModel')

exports.userPost = async (req, res) => {

    const { name, email, password } = req.body

    const userName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()

    const newUser = new userData({ userName, email, password })

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
exports.user = async (req, res) => {

    const { id } = req.params

    // console.log(id)

    try {

        const users = await userData.findById(id)

        res.status(200).json({ users })

    } catch (error) {
        console.log(error)
    }

}

exports.updateUser = async (req, res) => {

    const { id } = req.params
    const { userName, email, password } = req.body

    try {

        let user = await userData.findById(id)

        if (user) {

            user.email = email
            user.password = password ? password : user.password,
                user.userName = userName,

                await user.save()

            res.status(200).json({
                message: "Dados atualizados com sucesso ",
                user

            })

        }

    } catch (error) {
        console.log(error)
    }

}

