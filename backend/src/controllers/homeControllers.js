// const dishes = require('../model/dbModel')
const path = require('path')

const validator = require('validator')
const jwt = require('jsonwebtoken')
const User = require('../model/userModel')
const argon2 = require('argon2')
const cookieParser = require('cookie-parser')


exports.home = (req, res) => {
    res.sendFile('home.html', { root: "C:/Users/Igor/Documents/Repositório/notes-Nodejs/backend/src/views" })
}

exports.aboutController = (req, res) => {
    res.redirect('/teste')
    res.sendFile('about.html', { root: 'C:/Users/Igor/Documents/Repositório/deliveryWebsite/backend/src/views' })
}


//Login

exports.formLogin = (req, res) => {
    res.sendFile('login.html', { root: 'C:/Users/Igor/Documents/Repositório/notes-Nodejs/backend/src/views' })
}

exports.login = async (req, res) => {
    const { email, password } = req.body

    console.log(req.body)

    if (!validator.isEmail(email)) return res.status(400).json({ error: 'Email inválido' })
    if (!validator.isLength(password, { min: 6 })) return res.status(400).json({ error: 'Senha inválida' })


    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' })
        }

        const isPasswordValid = await argon2.verify(user.password, password)
        if (!isPasswordValid) return res.status(404).json({ error: "Credenciais inválidas" })


        /**
         * O token gerado no Login é para revalidar as credenciais do usuário, ou seja, quando
         * o usuário inserir seus dados na tela de login, o backend vai verificar as credenciais
         * do usuário, se forem validas é gerado um novo token para validar o usuario. Ou Para criar
         * novo token caso o do usuário tenha expirado.
         */
        const token = jwt.sign({ id: user._id, name: user.name }, process.env.JWT_TOKEN, { expiresIn: '1h' })

        res.status(200)
            .cookie('auth_token', token, {
                httpOnly: true, /**Impede acesso pelo js do client */
                secure: true, /**Garante que o cookie só será enviado via HTTPS */
                sameSite: 'strict', /**Pretege contra CSRF */
                maxAge: 60 * 60 * 1000 /**Expira em 1 hora */
            })
            .json({ message: 'Login bem-sucedido' })

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error no servidor' })
    }

}

// Rota de entrada no formulário
exports.signup = (req, res) => {
    res.sendFile('signUp.html', { root: 'C:/Users/Igor/Documents/Repositório/notes-Nodejs/backend/src/views' })
}


// Rota de recebimento de dados
exports.signupFinished = async (req, res) => {
    const { name, email, password } = req.body

    try {
        // varificar se email já existe
        const existUser = await User.findOne({ email })
        if (existUser) return res.status(400).json({ error: 'Email já registrado' })

        const user = new User({ name, email, password })

        await user.save();

        /**
         * O token de cadastro é para permitir a autenticação
         imediata do usuário após se registrar, Ou seja,
         serve para iniciar a seção a rotas protegidas sem que o
         usuário precise fazer login
         */

        const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN, { expiresIn: '1h' })


        res.status(200)
            .cookie('auth_token', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                maxAge: 60 * 60 * 1000

            })
            .json({ message: 'Usuário criado com sucesso' })
    } catch (error) {
        res.status(400).json({ error: 'Erro ao registrar o usuário' })
        console.log(error)
    }

}

exports.protegida = (req, res) => {
    res.status(200).json({ message: 'Acesso autorizado', user: req.user })
}