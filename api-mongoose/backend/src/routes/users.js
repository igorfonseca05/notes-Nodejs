const express = require('express')
// const multer = require('multer')
const path = require('path')

const multer = require('multer')

const route = express.Router()

// Controllers
const userController = require('../controllers/usersControllers')
const authController = require('../controllers/authController')

// middlewares
const validator = require('../middlewares/userValidator')
const verifyToken = require('../middlewares/verifyToken')


// Usando multer para uploads de arquivos

const upload = multer({
    // storage: multer.diskStorage({
    //     // destination: (req, file, cb) => {
    //     //     cb(null, 'src/uploads/')
    //     // },
    //     filename: (req, file, cb) => {
    //         const uniqueName = `${Date.now()}-${Math.random() * 1e9}${path.extname(file.originalname)}`
    //         cb(null, uniqueName)
    //     }
    // }),
    limits: { fileSize: 1 * 1024 * 1024 },
    fileFilter(req, file, cb) {
        if (file.originalname.match(/\.(png|jpg|jpeg)$/)) {
            return cb(null, file)
        }

        cb(new Error('Formato de arquivo inválido'))
    }
})

// Routes
route.post('/login', authController.signIn)
route.post('/signup', validator, authController.signUp)
route.post('/logout', verifyToken, authController.logout)
route.post('/logoutAll', verifyToken, authController.logoutAll)



/**Importande destacar que a rota usada para obter
 * todos os usuários cadastraados na base de dados não deve existir
 * pois os usuários não devem poder ter acesso as informações de outros
 * usuários.
*/
// Obter perfil de usuário
route.get('/me', verifyToken, userController.getusers)

// atualizar dados
route.patch('/me', verifyToken, userController.patchUser)

// excluir conta usuário
route.delete('/me', verifyToken, userController.deleteUser)

// Adicionar imagem de perfil
route.post('/me/avatar', verifyToken, upload.single('upload'), userController.uploads)


route.use((err, req, res, next) => {
    if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ message: 'O arquivo deve conter no maximo 1MB de tamanho' })
    }

    res.status(400).json({ message: err.message })
})


module.exports = route