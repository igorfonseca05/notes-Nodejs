
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

/**Nessa rota filtramos o array de tokens e removemos o token
 * enviado no header da requisição, fazendo com o que o usuário 
 * perca a autenticação.
 */
exports.logout = async (req, res) => {
    try {

        // Aqui estou removendo o token enviado no logout
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })

        await req.user.save()

        res.status(200).json({ message: 'Logout realizado com sucesso' })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


/**Nessa rota criamos uma logica para remover todos os tokens
 * do usuário de modo que ele seja delogado de todas as contas
 * de uma unica vez.
 */

exports.logoutAll = async (req, res) => {
    try {

        // Aqui estou removendo o token enviado no logout
        req.user.tokens = []

        await req.user.save()

        res.status(200).json({ message: 'Logout de contas realizado com sucesso' })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}