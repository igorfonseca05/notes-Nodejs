
const mongoose = require('mongoose')

const dishSchema = new mongoose.Schema(({
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String },
    quantity: { type: Number, required: true },
}))

const dishes = mongoose.model('dishes', dishSchema)

module.exports = dishes