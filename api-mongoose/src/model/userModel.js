const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    password: {
        type: String,
        required: true,
        trim: true
    }
})


const userData = mongoose.model('UserData', userSchema)

module.exports = userData