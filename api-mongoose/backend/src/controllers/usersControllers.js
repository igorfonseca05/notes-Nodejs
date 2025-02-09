
const userData = require('../model/userModel')
const path = require('path')



exports.getusers = async (req, res) => {
    res.status(200).json(req.user)
}


exports.deleteUser = async (req, res) => {
    try {

        await userData.findByIdAndDelete(req.user._id)

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


exports.uploads = async (req, res) => {

    console.log(req.file)
    try {

        if (!req.file) return res.status(400).json({ message: 'Imagem não enviada' })


        req.user.photo = req.file
        await req.user.save()

        res.status(200).json({ message: 'Upload realizado com sucesso', user: req.user })

    } catch (error) {
        console.log(error)
    }
}

exports.deleteAvatar = async (req, res) => {
    try {

        if (!req.user.photo || !req.user.format) {
            res.status(404).json({ message: 'Usuário não possui foto de perfil cadastrada' })
        }

        req.user.photo = undefined
        req.user.format = undefined

        await req.user.save()

        res.status(200).json({ message: 'Imagem de perfil deletada com sucesso', user: req.user })

    } catch (error) {
        console.log(error)
    }
}

exports.getAvatar = async (req, res) => {
    try {

        const user = await userData.findById(req.params.id)

        // console.log(user)

        if (!user || !user.photo) {
            throw new Error('Error ao carregar avatar do usuário')
        }

        res.set('Content-Type', user.format)

        res.status(200).send(user.photo)

    } catch (error) {
        res.status(400).json({ message: error.message })
        console.log(error)
    }
}

