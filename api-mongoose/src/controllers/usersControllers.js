
const userData = require('../model/userModel')

exports.userPost = async (req, res) => {

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

    try {
        const users = await userData.findById(id)

        res.status(200).json({ users })

    } catch (error) {
        console.log(error)
    }

}


exports.deleteUser = async (req, res) => {

    const { id } = req.params
    try {

        let user = await userData.findByIdAndDelete(id)

        if (user) {
            res.status(200).json({ message: "Usuário deletado com sucessos" })
        }

    } catch (error) {
        console.log(error)
    }

}

exports.patchUser = async (req, res) => {

    const keys = Object.keys(req.body)
    const allowedUpdate = ['userName', 'email', 'password']

    const isValidOperation = keys.every((updates) => allowedUpdate.includes(updates))


    if (!isValidOperation) return res.status(404).json({ message: 'Propriedade inválida' })

    const { id } = req.params
    // const { userName, email, password } = req.body

    // console.log(req.body)

    try {

        let user = await userData.findById(id)


        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado" })
        }

        keys.forEach(key => user[key] = req.body[key])

        // user.userName = userName || user.userName,
        //     user.email = email || user.email,
        //     user.password = password || user.password

        // console.log(user)

        try {
            await user.save()

            res.status(200).json({ message: 'Dados atualizados com sucesso', user })
        } catch (error) {
            // console.log(error)
            res.status(404).json({ message: error.message })
        }


    } catch (error) {
        return res.status(404).json({ message: error.massage })
    }

}

