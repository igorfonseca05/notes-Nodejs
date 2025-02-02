const express = require('express')

const router = express.Router()

const users = require('../routes/users')
const auth = require('../routes/auth')

//Rotas
router.use('/users', users)
router.use('/auth', auth)



// Rota para caso de erro
router.use((rq, res) => {
    res.send('URL não encontrada')
})


module.exports = router