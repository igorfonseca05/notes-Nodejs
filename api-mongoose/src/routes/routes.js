const express = require('express')

const router = express.Router()

const users = require('./users')
const auth = require('./auth')
const tasks = require('./task')

// Rotas para endpoint Users
router.use('/users', users)
router.use('/tasks', tasks)
// signIn/up/out routes
// router.use('/auth', auth)


module.exports = router