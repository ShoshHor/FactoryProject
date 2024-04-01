const authService = require('../Services/authService')
const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()

//auth/login
router.post('/login', async(req,res) => {
    const {username, email} = req.body
   
    const user = await authService.authUser(username, email)
    if(!user.success) return res.status(401) .send({message: user.message})
    
    const token = jwt.sign({username}, 'secret')
    res.send({token})
})

module.exports = router