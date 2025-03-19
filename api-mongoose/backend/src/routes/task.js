const express = require('express')

const router = express.Router()

// Controllers
const taskController = require('../controllers/taskController')

// middlewares
const verifyToken = require('../middlewares/verifyToken')

// Routes
router.get('/', verifyToken, taskController.getTasks)
router.get('/:id', verifyToken, taskController.getTask)
router.post('/', verifyToken, taskController.postTask)
router.patch('/:id', verifyToken, taskController.patchTasks)
router.delete('/:id', verifyToken, taskController.deleteTasks)

module.exports = router