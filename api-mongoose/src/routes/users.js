const express = require('express')

const route = express.Router()

// Controllers
const userController = require('../controllers/usersControllers')

// middlewares
const validator = require('../middlewares/userValidator')

// Obter usuários
route.get('/users', userController.getusers)

// Obter usúario
route.get('/users/:id', userController.user)

// // alterar dado de usúario especifico
// route.post('/users/:id', userController.updateUser)

// Adicionar Usúario
route.post('/users', validator, userController.userPost)

// atualizar dados
route.patch('/users/:id', userController.patchUser)

// excluir conta usuário
route.delete('/users/:id', userController.deleteUser)

module.exports = route