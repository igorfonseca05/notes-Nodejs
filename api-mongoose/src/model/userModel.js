const mongoose = require('mongoose')
const argon2 = require('argon2')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true,
        set: (value) => {
            value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
        }
    },
    email: { type: String, required: true, trim: true },
    password: {
        type: String,
        required: true,
        trim: true
    }
})



// Aqui estamos fazendo um hash da senha antes de salvar a senha
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()

    try {
        this.password = await argon2.hash(this.password)
        next()
    } catch (error) {
        next(error)
    }
})


const userData = mongoose.model('Users', userSchema)

module.exports = userData