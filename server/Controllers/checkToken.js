const jwt = require('jsonwebtoken')

const checkToken = (req,res,next) => {
    const token = req.headers['x-access-token']
    if (!token) return res.status(401).send({ message: 'No token provided' })
    
    try {
       const decoded =  jwt.verify(token, 'secret')
       next()
    }catch(e) {
        return res.status(401).json({message: "Invalid token"})
    }
}

module.exports = checkToken

