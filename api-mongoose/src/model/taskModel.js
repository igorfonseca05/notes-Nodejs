
const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    description: { type: String, required: true, trim: true, unique: true },
    completed: { type: Boolean, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Users' }
})

const taskModel = mongoose.model('Task', taskSchema)

module.exports = taskModel