// import { password } from '../model/userModel'

const validator = require('validator')

function validarDados(data) {

    const errors = []

    function testData(data) {
        if (!data.name || data.name.length <= 2) {
            errors.push("Nome inválido")

        }

        if (!data.email || !validator.isEmail(data.email)) {
            errors.push('Email inválido')

        }

        if (!data.password || !validator.isLength(data.password, { min: 6 })) {
            errors.push('Senha inválida, verifique sua senha!')

        }
        return null
    }

    testData(data)

    return errors.filter(error => error !== null)
}

module.exports = validarDados

// console.log(module.exports)