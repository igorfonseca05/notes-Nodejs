const express = require('express')

const router = express.Router()

const users = require('./users')
const auth = require('./auth')

// Rotas para endpoint Users
router.use('/users', users)
// signIn/up/out routes
// router.use('/auth', auth)


module.exports = router