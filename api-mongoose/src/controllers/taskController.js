
const taskModel = require('../model/taskModel')


exports.getTasks = async (req, res) => {

    try {
        const tasks = await taskModel.find()

        if (!tasks) {
            throw new Error('Tarefas não encontradas')
        }

        res.status(200).json({ tasks })

    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

exports.getTask = async (req, res) => {

    try {

        const { id } = req.params

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
        const newTask = new taskModel({ ...req.body, owned: req.user.id })

        try {

            await newTask.save()

        } catch (error) {

            if (error.code === 11000) {
                return res.status(404).json({ message: 'Tarefa já existente!' })
            }

            return res.status(404).json({ message: error.message })
        }

        res.status(200).json({ message: 'Task saved successfully', task: newTask })

    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

exports.patchTasks = async (req, res) => {

    const updates = Object.keys(req.body)
    const fields = ['description', 'completed']

    const fieldIsdValid = updates.every((update) => fields.includes(update))

    if (!fieldIsdValid) {
        return res.status(404).json({ messagem: 'unacknowledged field' })
    }

    try {
        const { id } = req.params

        const task = await taskModel.findByIdAndUpdate(id, {
            ...req.body
        }, { new: true })

        if (!task) {
            throw new Error('Tarefa não atualizada')
        }

        res.status(200).json({ task })

    } catch (error) {
        res.status(404).json({ message: error.message })
    }

}

exports.deleteTasks = async (req, res) => {

    try {
        const task = await taskModel.findByIdAndDelete(req.params.id, { new: false })
        if (!task) {
            throw new Error('Task does not exist')
        }

        res.status(200).json({ message: 'Removed task', task })

    } catch (error) {
        res.status(404).json({ message: error.message })
    }

}