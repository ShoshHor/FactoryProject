const departService = require('../Services/departmentService')
const express = require('express')
const router = express.Router()
const checkToken = require('./checkToken')
const attachUsername = require('./attachUsername')

//get all
router.get('/', checkToken, async(req, res) => {
    const departments = await departService.getAllDepartments()
    return res.send(departments)
})

//get by id
router.get('/:id', checkToken, attachUsername, async(req, res)=> {
    const {id} = req.params
    const depart = await departService.getDepartmentById(id)
    return res.send(depart)
})

//create
router.post('/', checkToken, attachUsername, async(req, res) => {
    const obj = req.body
    const status = await departService.createDepartment(obj)
    res.send({status})
})

//update
router.put('/:id', checkToken, attachUsername, async(req, res) => {
    const {id} = req.params
    const obj = req.body
    const status = await departService.updateDepartment(id, obj)
    return res.send({status})
})

//delete
router.delete('/:id', checkToken, attachUsername, async(req, res) => {
    const {id} = req.params
    const status = await departService.deleteDepartment(id)
    return res.send({status})
})

//to departments table
router.get('/data/toTable', checkToken, attachUsername, async(req, res) => {
    const data = await departService.getAllDepartsData()
    return res.send(data)
})

/////get depart manager name by id
router.get('/:id/managername',checkToken, async(req, res) => {
    const {id} = req.params
    const departAndManager = await departService.departManagerName(id)
    return res.send(departAndManager)
})

module.exports = router