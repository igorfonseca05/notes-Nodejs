const mongoose = require('mongoose')
const argon2 = require('argon2')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
})

// Colocando nome em letra maiscula 
userSchema.pre('save', function (next) {
    if (this.userName) {
        this.userName = this.userName.charAt(0).toUpperCase() + this.userName.slice(1).toLocaleLowerCase()
    }

    next()
})



// Aqui estamos fazendo um hash da senha antes de salvar a senha
userSchema.pre('save', async function (next) {
    const user = this

    if (!user.isModified('password')) return next()

    try {
        user.password = await argon2.hash(user.password, {
            type: argon2.argon2id,
            memoryCost: 2 ** 16,
            timeCost: 5,
            parallelism: 1

        })
        next()
    } catch (error) {
        next(error)
    }
})


const userData = mongoose.model('Users', userSchema)

module.exports = userData