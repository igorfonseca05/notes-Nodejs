const express = require('express')
const multer = require('multer')
const path = require('path')

const route = express.Router()

// Controllers
const userController = require('../controllers/usersControllers')
const authController = require('../controllers/authController')

// middlewares
const validator = require('../middlewares/userValidator')
const verifyToken = require('../middlewares/verifyToken')


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

// // Usando multer para uploads de arquivos

const uplaod = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'src/uploads/')
        },
        filename: (req, file, cb) => {
            const uniqueName = `${Date.now()}-${Math.random() * 1e9}${path.extname(file.originalname)}`
            cb(null, uniqueName)
        }
    }),
    limits: { fileSize: 1 * 1024 * 1024 }, // 1MB,
    fileFilter(req, file, cb) {
        if (file.originalname.match(/\.(doc|docx)$/)) {
            return cb(null, file)
        }

        cb(new Error('Arquivo não suportado'))
    }
})



// Obter perfil de usuário
route.get('/me', verifyToken, userController.getusers)

// atualizar dados
route.patch('/me', verifyToken, userController.patchUser)

// excluir conta usuário
route.delete('/me', verifyToken, userController.deleteUser)

// Adicionar imagem de perfil
route.post('/me/avatar', verifyToken, uplaod.single('upload'), authController.uploads)


// Lidando com error do multer
route.use((err, req, res, next) => {

    if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ message: "O arquivo é muito grande! O limite é 1MB" });
    }

    res.status(400).json({ message: err.message });
    next(err);
})


module.exports = route