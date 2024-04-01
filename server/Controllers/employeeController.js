const employeesService = require('../Services/employeesService')
const express = require('express')
const router = express.Router()
//const jwt = require('jsonwebtoken')
 const checkToken = require('./checkToken')
const attachUsername = require('./attachUsername')


 //get all
router.get('/', checkToken, attachUsername, async (req, res) => {
    const {username} = req.params;
    const employees = await employeesService.getAllEmployees()
    console.log(`המשתמש הנוכחי הוא: ${username}`);
    return res.send(employees)
})
//get by id
router.get('/:id',checkToken, async (req, res) => {
    const { id } = req.params
    const employee = await employeesService.getEmployeeById(id)
    return res.send(employee)
})
//get full data by id
router.get('/full/data/:id',checkToken, attachUsername, async (req, res) => {
    const { id } = req.params
    const employee = await employeesService.getFullDataEmployee(id)
    return res.send(employee)
})
//create
router.post('/',checkToken, attachUsername, async (req, res) => {
    const obj = req.body
    console.log(obj)
    const status = await employeesService.createNewEmployee(obj)
    return res.send({ status })
})
//update- put
router.put('/:id',checkToken, attachUsername, async (req, res) => {
    const { id } = req.params
    const obj = req.body
    const status = await employeesService.updateEmployee(id, obj)
    return res.send({ status })
})
//update- patch
router.patch('/:id',checkToken, async (req, res) => {
    const { id } = req.params
    const obj = req.body
    const status = await employeesService.updateEmployee(id, obj)
    return res.send({ status })
})
//delete
router.delete('/:id', checkToken, attachUsername, async(req, res) => {
    const {id} = req.params
    const status = await employeesService.deleteEmployee(id)
    return res.send({status})
})
//get all data
router.get('/:id/allData',checkToken, async (req, res) => {
    const { id } = req.params
    const data = await employeesService.getAllEmployeeData(id)
    return res.send(data)
})
//get data to table
//router.get('/data/toTable/:username',checkToken,attachUsername, async (req, res) => {
    router.get('/data/toTable',checkToken,attachUsername, async (req, res) => {
        console.log(',,,,');
    try { 
        const username = req.username;  
        const empData = await employeesService.employeesData(username)
        return res.send(empData)
    }
    catch (e) {
        return res.status(401).json({ message: e.message})
    }

})


module.exports = router
