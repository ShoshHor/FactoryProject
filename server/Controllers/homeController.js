const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

//home
router.get('/', (req, res) => {
    const token = req.headers['x-access-token']
    if (!token) res.status(401).send({message: 'No token provided'})
    try{
        const decoded = jwt.verify(token, "secret")
}
catch(e){
    res.status(401).send({message: 'Invalid token'})
}
})

module.exports = router