
const jwt = require('jsonwebtoken')
const userModel = require('../model/userModel')

async function verifyToken(req, res, next) {

    try {
        const token = req.headers.authorization?.replace('Bearer', '').trim()

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await userModel.findOne({ _id: decoded._id, 'tokens.token': token }).select('-password')

        if (!user) {
            throw new Error('Usuário não encontrado')
        }

        req.token = token
        req.user = user

        next()

    } catch (error) {
        console.log(error)
        res.status(401).json({ message: error.message })
    }

}


module.exports = verifyToken