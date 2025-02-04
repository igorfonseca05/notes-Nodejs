const mongoose = require('mongoose')
const argon2 = require('argon2')

// const User = require('../Models/userModel')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})



userSchema.statics.findByCredentials = async (email, password) => {
    try {
        // const {email} = userData.email
        const user = await User.findOne({ email })

        if (!user) {
            throw new Error('Usuário não cadastrado')
        }

        const isMatch = await argon2.verify(user.password, password)

        if (!isMatch) {
            throw new Error('Senha incorreta')
        }

        return user

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}



// Fazer hash da senha antes de salva-la
userSchema.pre('save', async function (next) {
    const user = this

    if (!user.isModified('password')) next

    user.password = await argon2.hash(user.password, {
        type: argon2.argon2id,
        timeCost: 5,
        memoryCost: 2 ** 16,
        parallelism: 1
    })

    next
})

const user = mongoose.model('User', userSchema)

module.exports = user