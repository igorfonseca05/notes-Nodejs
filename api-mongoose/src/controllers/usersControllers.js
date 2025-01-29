
const userData = require('../model/userModel')


exports.getusers = async (req, res) => {

    res.status(200).json(req.user)

}


exports.deleteUser = async (req, res) => {

    try {

        await userData.findByIdAndDelete(req.user._id)
        // await req.user.deleteOne
        res.status(200).json({
            message: "Usuário deletado com sucessos",
            user: req.user
        })

    } catch (error) {
        console.log(error)
    }

}

exports.patchUser = async (req, res) => {

    const keys = Object.keys(req.body)
    const allowedUpdate = ['userName', 'email', 'password']

    const isValidOperation = keys.every((updates) => allowedUpdate.includes(updates))

    if (!isValidOperation) return res.status(404).json({ message: 'Propriedade inválida' })

    try {

        // console.log(req)

        keys.forEach(key => req.user[key] = req.body[key])

        try {
            await req.user.save()
            res.status(200).json({ message: 'Dados atualizados com sucesso', user: req.user })

        } catch (error) {
            res.status(404).json({ message: error.message })
        }

    } catch (error) {
        return res.status(404).json({ message: error.massage })
    }

}

