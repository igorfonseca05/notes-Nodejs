const express = require('express')

const route = express.Router()

// Controllers
const userController = require('../controllers/usersControllers')
const authController = require('../controllers/authController')

// middlewares
const validator = require('../middlewares/userValidator')


// custom middlewares
const verifyToken = require('../middlewares/verifyToken')


// signIn users
route.post('/login', authController.signIn)

// signUp users
route.post('/signup', validator, authController.signUp)


/**Importande destacar que a rota usada para obter
 * todos os usuários cadastraados na base de dados não deve existir
 * pois os usuários não devem poder ter acesso as informações de outros
 * usuários.
 */

// Obter perfil de usuário
route.get('/me', verifyToken, userController.getusers)

// Obter usúario
route.get('/:id', userController.user)

// atualizar dados
route.patch('/:id', userController.patchUser)

// excluir conta usuário
route.delete('/:id', userController.deleteUser)


module.exports = route