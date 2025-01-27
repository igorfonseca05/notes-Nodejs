const express = require('express')

const route = express.Router()

// Controllers
const userController = require('../controllers/usersControllers')

// middlewares
const validator = require('../middlewares/userValidator')

// Obter usuários
route.get('/users', userController.getusers)

// Obter usúario
route.get('/user/:id', userController.user)

route.post('/user/:id', userController.updateUser)
route.post('/signup', validator, userController.userPost)


module.exports = route