const express = require('express')

const router = express.Router()


const authController = require('../Controllers/authController')

router.get('/', authController.getUsers)

// Rota de inscrição
router.post('/signup', authController.signup)


module.exports = router