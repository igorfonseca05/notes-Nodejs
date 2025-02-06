
const taskModel = require('../model/taskModel')
const usersData = require('../model/userModel')


exports.getTasks = async (req, res) => {

    if (req.query.skip <= 0) req.query.skip = 1

    try {

        const user = await req.user.populate({
            path: 'tasks',
            match: req.query.completed ? { completed: req.query.completed === 'true' } : null,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt((req.query.skip - 1) * req.query.limit),
                // Verificando se o sortBy foi enviado, se foi verifica se é desc ou asce, senão não faz nada
                sort: req.query.sortBy ? req.query.sortBy.split(':')[1] === 'desc' ? -1 : 1 : null
            }
        })

        if (!user.tasks.length) {
            throw new Error('Não há tarefas adicionadas por esse usuário')
        }

        res.status(200).json({ tasks: req.user.tasks })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.getTask = async (req, res) => {

    try {

        const _id = req.params.id

        const task = await taskModel.findOne({ _id, owner: req.user._id })

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
        const newTask = new taskModel({ ...req.body, owner: req.user._id })

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

        const _id = req.params.id

        const task = await taskModel.findOne({ _id, owner: req.user._id })

        if (!task) {
            throw new Error('Tarefa não atualizada')
        }

        // Aqui estamos alterando o valor dos dados da task
        // retornada pelo base de dados na busca
        // e trocando pelos dados enviados no corpo da requisição.
        updates.forEach((update) => task[update] = req.body[update])

        await task.save()

        res.status(200).json({ task })

    } catch (error) {
        res.status(404).json({ message: error.message })
    }

}

exports.deleteTasks = async (req, res) => {

    try {
        const task = await taskModel.findByIdAndDelete({ _id: req.params.id, owner: req.user._id })

        console.log(task)

        if (!task) {
            throw new Error('Task does not exist')
        }

        res.status(200).json({ message: 'Removed task', task })

    } catch (error) {
        res.status(404).json({ message: error.message })
    }

}