const validator = require('validator')

function response(message) {
    return {
        message
    }

}

function validate(req, res, next) {

    const { userName, email, password } = req.body

    if (!userName || userName.length <= 2) {
        return res.status(400).json({ message: 'O nome deve conter mais de 2 caracteres' })
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: 'Email inválido' })
    }

    if (!validator.isLength(password, { min: 6 })) {
        return res.status(400).json({ message: 'Senha deve conter no minimo 6 caracteres' })
    }

    next()

}

module.exports = validate