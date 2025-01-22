const express = require('express')

const route = express.Router()

// Controllers
const userController = require('../controllers/usersControllers')

// middlewares
const validator = require('../middlewares/userValidator')

route.get('/users', userController.getusers)
route.get('/user/:id', userController.user)

route.post('/user/:id', userController.updateUser)
route.post('/signup', validator, userController.userPost)


module.exports = route