const mongoose = require('mongoose')
const argon2 = require('argon2')
const validator = require('validator')

const jwt = require('jsonwebtoken')

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
        trim: true,
    },
    photo: {
        type: Object,
    },
    format: {
        type: String
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
})

userSchema.methods.toJSON = function () {
    const user = this

    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

// Codigo extremamente importante

userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner',
})

userSchema.set("toObject", { virtuals: true })
userSchema.set("toJSON", { virtuals: true })

// Método para gerar novo token

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })

    if (user.tokens.length >= 3) {
        user.tokens.shift()
    }

    user.tokens?.push({ token })

    await user.save()

    return token
}

userSchema.statics.findByCredentials = async function ({ email, password }) {

    const user = this

    const existUser = await user.findOne({ email })

    if (!existUser) {
        throw new Error('Usuário não cadastrado')
    }

    const isValid = await argon2.verify(existUser.password, password)

    if (!isValid) {
        throw new Error('Senha inválida')
    }

    return existUser

}


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