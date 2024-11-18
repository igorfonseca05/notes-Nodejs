
// Model para eu lembrar como faz o hash na base de dados

const mongoose = require('mongoose')
const argon2 = require('argon2')

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
})

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await argon2.hash(this.password)
    }

    next()
})

const user = mongoose.model('user', userSchema)

module.exports = user