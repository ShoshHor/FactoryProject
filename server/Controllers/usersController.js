const userService = require('../Services/usersService')
const express = require('express')
const router = express.Router()
const checkToken = require('./checkToken')

//get all
router.get('/', checkToken , async(req, res) => {
    const users = await userService.getAllUsers()
    return res.send(users)
})

//get by id
router.get('/:id', checkToken, async(req, res) => {
    const {id} = req.params
    const user = await userService.getUserById(id)
    return res.send(user)
})

//get users from jf
router.get('/JF/toTable', checkToken, async(req, res) => {
    const usersToTable = await userService.getUsersFromJF()
    return res.send(usersToTable)
})

module.exports = router