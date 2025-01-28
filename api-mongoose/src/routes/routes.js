const express = require('express')

const routes = express.Router()

const users = require('./users')

// Rotas para endpoint Users
routes.use(users)

module.exports = routes