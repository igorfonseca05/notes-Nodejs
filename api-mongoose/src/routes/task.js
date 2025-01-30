
const express = require('express')

const router = express.Router()

// Controllers
const taskController = require('../controllers/taskController')


router.get('/', taskController.getTasks)
router.get('/:id', taskController.getTask)
router.post('/', taskController.postTask)
router.patch('/:id', taskController.patchTasks)
router.delete('/:id', taskController.deleteTasks)



module.exports = router