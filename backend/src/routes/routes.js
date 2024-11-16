const express = require('express')

const routes = express.Router()
const home = require('../controllers/homeControllers')


routes.get('/', home.home)
routes.get('/about', home.aboutController)



// Usando middleware para interceptar request
routes.get('/teste', home.teste)

// middleware para interceptar dados
routes.use((req, res, next) => {
    console.log(req.body)

    next()
})

// routes.post('/teste', home.teste)

routes.post('/submit', home.submit)

routes.use((req, res) => {
    res.status(404).send('error')
})


module.exports = routes