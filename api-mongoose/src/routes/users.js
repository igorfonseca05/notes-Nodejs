const express = require('express')

const route = express.Router()

// Controllers
const userController = require('../controllers/usersControllers')

// middlewares
const validator = require('../middlewares/userValidator')

route.get('/users', userController.getusers)

route.post('/signup', validator, userController.userPost)


module.exports = route