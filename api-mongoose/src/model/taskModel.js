
const mongoose = require('mongoose')


const taskSchema = new mongoose.Schema({
    description: { type: String, required: true, trim: true },
    completed: { type: Boolean, required: true },
    // owned: { type: mongoose.Schema.Types.ObjectId, required: true }
})

const taskModel = mongoose.model('Task', taskSchema)

module.exports = taskModel