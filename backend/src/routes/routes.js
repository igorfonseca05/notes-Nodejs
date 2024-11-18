const express = require('express')
const validator = require('validator')

const validarDados = require('../validator/validator')
const authorizationToken = require('../tokens/authorizationToken')

// console.log(validarDados)

const routes = express.Router()
const home = require('../controllers/homeControllers')


routes.get('/', home.home)

// Rotas para fazer login
routes.get('/login', home.formLogin)
routes.post('/login', home.login)

routes.get('/protegida', authorizationToken, home.protegida)

// Rota para fazer Cadastro
routes.get('/signup', home.signup)

// Middleware para validar os dados de cadastro
routes.use((req, res, next) => {

    const { name, email, password, confirmPassword } = req.body

    if (password !== confirmPassword) {
        console.log('As senhas devem coincidir')
        res.redirect('/signup')
        return
    }

    const errors = validarDados(req.body)

    if (errors.length !== 0) {
        errors.forEach(error => {
            res.send(error)
        })
        return
    }

    next()
})

routes.post('/signup', home.signupFinished)



module.exports = routes