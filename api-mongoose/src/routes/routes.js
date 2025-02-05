const express = require('express')

const router = express.Router()


// Controllers das rotas
const users = require('./users')
const tasks = require('./task')


// Usando multer para uploads de arquivos

// 1° Passo
const multer = require('multer')

// 3° Passo - usar o diskStorage para definir onde salvar e nome do arquivo
const storage = multer.diskStorage({
    destination: (req, file, cb) => {  // Configuração de onde salvaremos os arquivos, nesse caso pasta uploads
        cb(null, 'upload/s')
    }
})


// 2° Passo
const upload = multer({ storage })



router.post('/upload', upload.single('upload'), (req, res) => {
    res.status(200).json({ message: 'upload co' })
})


// Rotas para endpoint Users
router.use('/users', users)
router.use('/tasks', tasks)

module.exports = router