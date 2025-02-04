const mongoose = require('mongoose')
const argon2 = require('argon2')

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true, trim: true }
})




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