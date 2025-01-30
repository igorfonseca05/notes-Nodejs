
const taskModel = require('../model/taskModel')


exports.getTasks = async (req, res) => {



}

exports.getTask = async (req, res) => {
    try {

        const { id } = req.body

        const task = await taskModel.findById(id)

        if (!task) {
            throw new Error('Tarefa não encontrada')
        }

        res.status(200).json({ task })

    } catch (error) {
        res.status(404).json({ message: error.message })
    }


}

// Rota de postar tarefas
exports.postTask = async (req, res) => {
    try {

        const { description, completed } = req.body
        const newTask = new taskModel({ description, completed })

        try {
            await newTask.save()
        } catch (error) {
            res.status(404).json({ message: error.message })
        }

        res.status(200).json({ message: 'Task saved successfully' })

    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

exports.patchTasks = async (req, res) => {

}

exports.deleteTasks = async (req, res) => {

}