const shiftService = require('../Services/shiftsService')
const express = require('express')
const router = express.Router()
const checkToken = require('./checkToken')
const attachUsername = require('./attachUsername')

router.get('/', checkToken, attachUsername, async(req, res)=> {
    const shifts = await shiftService.getAllShifts()
    return res.send(shifts)  
})

router.get('/:id', checkToken, async(req,res)=> {
    const {id} = req.params
    const shift = await shiftService.getShiftById(id)
    return res.send(shift) 
})

router.post('/', checkToken, attachUsername, async(req, res) => {
    const obj = req.body
    const status = await shiftService.createNewShift(obj)
    return res.send({status}) 
})

router.put('/:id', checkToken, attachUsername, async(req, res) => {
    const {id} = req.params
    const obj = req.body
    const status = await shiftService.updateShift(id, obj)
    return res.send({status}) 
})

module.exports = router