const express = require('express')

const router = express.Router()


const authController = require('../Controllers/authController')

// router.get('/', authController.getUsers)

// Rota de inscrição(publicas)
router.post('/signup', authController.signup)
router.post('/login', authController.login)


module.exports = router