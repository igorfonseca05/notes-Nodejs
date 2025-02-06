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
        cb(null, 'src/uploads/')
    }
})


// 2° Passo
const upload = multer({ storage })



router.get('/uploads', (req, res) => {
    // console.log(req.file)
    res.status(200).json({ message: 'upload está aqui' })
})

router.post('/uploads', upload.single('upload'), (req, res) => {
    console.log(req.file)
    res.status(200).json({ message: 'upload está aqui' })
})


// Rotas para endpoint Users
router.use('/users', users)
router.use('/tasks', tasks)

module.exports = router