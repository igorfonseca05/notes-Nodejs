const validator = require('validator')

function response(statusCode, message) {
    return {
        statusCode,
        message
    }

}

function validate(req, res, next) {

    const { userName, email, password } = req.body

    if (!userName || userName.length <= 2) {
        return res.send(response(404, 'O nome deve conter mais de 2 caracteres'))
    }

    if (!validator.isEmail(email)) {
        return res.send(response(404, 'Email inválido'))
    }

    if (!validator.isLength(password, { min: 6 })) {
        return res.send(response(404, 'Senha deve conter no minimo 6 caracteres'))
    }

    next()

}

module.exports = validate