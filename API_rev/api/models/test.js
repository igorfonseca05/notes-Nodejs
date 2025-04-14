
const mongoose = require('mongoose')

const testSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true // Usado para remover espaços em branco
    },
    dateOfBirthday: {
        type: Number,
        required: true,
        default: null,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7
    }
})