const jwt = require('jsonwebtoken')

exports.authenticateToken = (req, res, next) =>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split('')[1]

    if (!token) return res.status(401).json({message: 'token no proporcionado'})

    jwt.verify(token, process.env.JWT_SECRET, (err, payload) =>{
        if (err) return res.status(403).json({ message: "token invalido"})
        console.log(payload)

        req.user = payload;
        next()
    })
}