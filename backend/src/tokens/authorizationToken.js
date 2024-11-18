const jwt = require('jsonwebtoken')

function authorizationToken(req, res, next) {

    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(400).json({ error: 'Token não fornecido' })
    }

    jwt.verify(token, process.env.JWT_TOKEN, (err, user) => {
        if (err) return res.status(403).json({ message: 'Token inválido' })

        req.user = user;

        next()
    })

}

module.exports = authorizationToken