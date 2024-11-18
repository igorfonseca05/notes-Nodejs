
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const argon2 = require('argon2')

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
})

/**Aqui estou usando a função de middleware disponivel
 * no mongoose que é usada para interceptar dados antes de 
 * salva-los ou valida-los para eventuamente alterá-los
 */
userSchema.pre('save', async function (next) {

    // aqui estamos verificando se a senha foi alterada
    if (!this.isModified('password')) return next()

    // fazendo hash da senha antes de salva-lá
    this.password = await argon2.hash(this.password)
    next()
})

/**O processo de hash acima é obrigátorio, pois converte a senha
 * inserida pelo usuário em um cadeia de caracteres que é
 * matematicamente impossivel de ser quebrada antes de salvar os dados
 * na base de dados
 */

// Criamos o model
const Users = mongoose.model('Users', userSchema)

// exportamos o model
module.exports = Users