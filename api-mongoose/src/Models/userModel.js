const mongoose = require('mongoose')

const argon2 = require('argon2')
const jwt = require('jsonwebtoken')


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

userSchema.methods.generateToken = async function ({ _id }) {

    const user = this

    const secretKey = process.env.JWT_SECRET
    const token = jwt.sign({ _id }, secretKey, { expiresIn: '7d' }) // Gerando Token

    // console.log(token)

    // const tokensIsGratherThan4 = user.tokens.length >= 4

    if (user.tokens.length >= 4) { //Fazendo controle de tokens
        user.tokens.shift()
    }

    user.tokens = user.tokens.push({ token })// Adicionando tokens na base de dados

    await user.save()

    return token

}


userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Usuário não cadastrado')
    }

    const isMatch = await argon2.verify(user.password, password)

    if (!isMatch) {
        throw new Error('Senha incorreta')
    }

    return user
}


// Fazer hash da senha antes de salva-la
userSchema.pre('save', async function (next) {
    const user = this

    if (!user.isModified('password')) return next()

    user.password = await argon2.hash(user.password, {
        type: argon2.argon2id,
        timeCost: 5,
        memoryCost: 2 ** 16,
        parallelism: 1
    })

    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User