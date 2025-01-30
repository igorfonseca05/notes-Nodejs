
const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    description: { type: String, required: true, trim: true, unique: true },
    completed: { type: Boolean, required: true },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
    }
})

// taskSchema.methods.toJSON = function () {
//     const task = this

//     const taskObject = task.toObject()

//     delete taskObject.owner

//     return taskObject
// }

const taskModel = mongoose.model('Task', taskSchema)

module.exports = taskModel