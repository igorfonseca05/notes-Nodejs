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

// alterar dado de usúario especifico
route.post('/user/:id', userController.updateUser)

// Adicionar Usúario
route.post('/users', validator, userController.userPost)


module.exports = route