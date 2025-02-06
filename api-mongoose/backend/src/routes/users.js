const express = require('express')

const route = express.Router()

// Controllers
const userController = require('../controllers/usersControllers')
const authController = require('../controllers/authController')

// middlewares
const validator = require('../middlewares/userValidator')
const verifyToken = require('../middlewares/verifyToken')


// // Usando multer para uploads de arquivos

// // 1° Passo
// const multer = require('multer')

// // 3° Passo - usar o diskStorage para definir onde salvar e nome do arquivo
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {  // Configuração de onde salvaremos os arquivos, nesse caso pasta uploads
//         cb(null, 'uploads/')
//     }
// })


// // 2° Passo
// const upload = multer({ storage })


// route.get('/uploads', (req, res) => {
//     // console.log(req.file)
//     res.status(200).json({ message: 'upload está aqui' })
// })

// route.post('/uploads', upload.single('upload'), (req, res) => {
//     console.log(req.file)
//     res.status(200).json({ message: 'upload está aqui' })
// })


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


module.exports = route