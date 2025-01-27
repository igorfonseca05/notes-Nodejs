
const userData = require('../model/userModel')

exports.userPost = async (req, res) => {

    const { userName, email, password } = req.body

    const newUser = new userData({ userName, email, password })

    try {
        newUser.save()

        return res.json({
            messagem: 'Usúario criado com sucesso',
            newUser
        })

    } catch (error) {
        return res.json({
            message: error.message
        })
    }

}

exports.getusers = async (req, res) => {

    try {

        const users = await userData.find()

        if (users.length === 0) {
            return res.status(401).json({ message: 'Users not found' })
        }

        return res.status(200).json({ users })

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
            user.password = password ? password : user.passwords,
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

