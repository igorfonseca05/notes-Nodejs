const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
    res.send('Acessou rota /auth')
})


module.exports = router