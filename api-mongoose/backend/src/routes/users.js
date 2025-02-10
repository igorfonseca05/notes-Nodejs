const express = require('express')
// const multer = require('multer')
const path = require('path')

// const multer = require('multer')
// const { CloudinaryStorage } = require('multer-storage-cloudinary')
// const { v2: cloudinary } = require('cloudinary')


const multer = require('multer')
const { v2: cloudinary } = require('cloudinary')
const { CloudinaryStorage } = require('multer-storage-cloudinary')


const route = express.Router()

// Controllers
const userController = require('../controllers/usersControllers')
const authController = require('../controllers/authController')

// middlewares
const validator = require('../middlewares/userValidator')
const verifyToken = require('../middlewares/verifyToken')


// Usando multer e cloudinary para uploads de arquivos



// const upload = multer({
//     storage,
//     limits: { fileSize: 1 * 2024 * 1024 },
//     fileFilter: (req, file, cb) => {
//         if (file.originalname.match(/\.(png|jpeg|jpg)$/)) {
//             return cb(null, file)
//         }

//         cb(new Error('Formato inválido'))
//     }
// })



// cloudinary.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.API_KEY,
//     api_secret: process.env.API_SECRET
// })

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_KEY_SECRET
})

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: (req, file) => `Auth/${req.user.id}/profile`,
        format: (req, file) => path.extname(file.originalname).substring(1),
        public_id: (req, file) => `${req.user.id} - ${Date.now()}`,
        transformation: [{
            quality: 'auto',
            height: 400,
            width: 400,
            crop: 'fill',
            gravity: 'auto'
        }]
    }
})

const upload = multer({
    storage,
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

// Remover imagem de perfil
route.delete('/me/avatar', verifyToken, userController.deleteAvatar)

// Obter imagem de perfil
// route.get('/:id/avatar', userController.getAvatar)


route.use((err, req, res, next) => {
    if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ message: 'O arquivo deve conter no maximo 1MB de tamanho' })
    }

    res.status(400).json({ message: err.message })
})


module.exports = route