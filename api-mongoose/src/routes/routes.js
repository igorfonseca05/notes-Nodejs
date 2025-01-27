const express = require('express')

const routes = express.Router()

const users = require('./users')

// Rotas para endpoint Users
routes.use('/usersdata', users)

module.exports = routes