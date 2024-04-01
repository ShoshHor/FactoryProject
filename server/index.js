const authController = require('./Controllers/authController')
const homeController = require('./Controllers/homeController')
const employeeController = require('./Controllers/employeeController')
const departController = require('./Controllers/departmentController')
const shiftController = require('./Controllers/shiftsController')
const userController = require('./Controllers/usersController')
const setUsersOnce = require('./Data/utils')

const express = require('express')
const cors = require('cors')
const connectDB = require('./Configs/db')
const app = express()
const PORT = 8080

connectDB()
//app.use(express.json())



app.use(express.json())
app.use(cors())
//app.use(setUsersOnce)



app.use('/auth', authController)
app.use('/home', homeController)
app.use('/employee', employeeController)
app.use('/department', departController)
app.use('/shift', shiftController)
app.use('/users', userController)
//app.use(setUsersOnce)

app.listen(PORT, ()=>{
    console.log(`Server is running at http://127.0.0.1:${PORT}`);
})