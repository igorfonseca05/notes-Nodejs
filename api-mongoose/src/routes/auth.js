const express = require('express')

const router = express.Router()

const authController = require('../controllers/authController')

// Logar usuário
router.get('/login', authController.signIn)




module.exports = router