const express = require('express')

const router = express.Router()


// Controllers das rotas
const users = require('./users')
const tasks = require('./task')


// Rotas para endpoint Users
router.use('/users', users)
router.use('/tasks', tasks)

module.exports = router