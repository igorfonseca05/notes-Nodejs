
const jwt = require('jsonwebtoken')
const userModel = require('../model/userModel')

async function verifyToken(req, res, next) {

    try {
        const token = req.headers.authorization?.replace('Bearer', '').trim()

        if (!token) {
            throw new Error('Usuário não autorizado')
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await userModel.findOne({ _id: decoded._id, 'tokens.token': token }).select('-password')

        if (!user) {
            throw new Error('Usuário não encontrado')
        }

        req.token = token
        req.user = user

        next()

    } catch (error) {

        if (error.message === 'Usuário não encontrado') {
            return res.status(404).json({ message: error.message })
        }

        if (error.message === 'Usuário não autorizado') {
            return res.status(403).json({ message: error.message })
        }

        return res.status(500).json({ message: error.message })
    }

}


module.exports = verifyToken