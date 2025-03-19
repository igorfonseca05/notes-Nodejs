
const userData = require('../model/userModel')
const path = require('path')

const sendEmail = require('../Email/account')


exports.getusers = async (req, res) => {
    res.status(200).json(req.user)
}


exports.deleteUser = async (req, res) => {
    try {

        await userData.findByIdAndDelete(req.user._id)

        const text = 'Confirmamos que sua conta foi excluída com sucesso. Lamentamos vê-lo(a) partir, mas respeitamos sua decisão. \n Se houver algo que possamos melhorar ou se desejar retornar no futuro, estaremos de braços abertos para recebê-lo(a) \n !Se a exclusão foi um engano ou precisar de suporte, entre em contato conosco. \nAtenciosamente,\n Igor Fonseca.'

        sendEmail(req.user.email, req.user.userName, `Desculpe por vê-lo partir 😕`, `Até logo ${req.user.userName}. \n ${text}`)
        res.status(200).json({
            message: "Usuário deletado com sucessos",
            user: req.user
        })

    } catch (error) {
        res.status(401).json({
            message: "Erro ao deletar usuário",
        })
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
    try {

        if (!req.file) return res.status(400).json({ message: 'Imagem não enviada' })

        req.user.photo = req.file
        console.log(req.file)
        // req.user.photo = req.file.buffer
        // req.user.format = req.file.mimetype
        await req.user.save()

        res.status(200).json({ message: 'Upload realizado com sucesso', user: req.user })

    } catch (error) {
        // console.log(error)
        res.status(404).json({ message: error.message })
    }
}

exports.deleteAvatar = async (req, res) => {
    try {

        if (!req.user.photo) {
            res.status(404).json({ message: 'Usuário não possui foto de perfil cadastrada' })
        }

        req.user.photo = undefined

        await req.user.save()

        res.status(200).json({ message: 'Imagem de perfil deletada com sucesso', user: req.user })

    } catch (error) {
        es.status(404).json({ message: error.message })
    }
}


// Fiz a integração do meu projeto com o Cloudinary, onde faço o upload
//da imagem do usuário e salvo na base de dados o link que é
// enviado ao usuário assim que ele faz o upload.

// exports.getAvatar = async (req, res) => {
//     try {

//         const user = await userData.findById(req.params.id)

//         if (!user || !user.photo) {
//             throw new Error('Error ao carregar avatar do usuário')
//         }

//         res.set('Content-Type', "image/jpeg")

//         res.status(200).send(user.photo.path)

//     } catch (error) {
//         res.status(400).json({ message: error.message })
//     }
// }

