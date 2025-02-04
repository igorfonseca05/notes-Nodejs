const express = require('express')

const router = express.Router()

const userController = require('../Controllers/usersController')

router.get('/', userController.getUsersInfo)
router.post('/', userController.createUser)
router.patch('/:id', userController.modifyUser)
router.delete('/:id', userController.deleteUser)
router.delete('/', userController.deleteAll)


module.exports = router