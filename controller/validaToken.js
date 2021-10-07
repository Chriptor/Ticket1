const jwt = require('jsonwebtoken')

const verificaToken = (req, res, next) => {
    const token = req.header('auth-token')
    if(!token) {
        return res.status(401).json({error: 'Acceso Denegado'})
    }
    try {
        const verificar = jwt.verify(token, process.env.SECRET_TOKEN)
        req.user = verified
        next()
    } catch (error) {
        res.status(401).json({error: 'Token invalido'})
    }
}
