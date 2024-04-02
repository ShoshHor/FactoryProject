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

let isFirstLoad = true
const usersRepository = require("./Repositories/usersRepository")
const usersService = require("./Services/usersService")
app.use(express.json())
app.use(cors())
app.use(async (req, res, next) => {
    console.log(isFirstLoad)

    const actions = await usersService.getUsersActions()
    if (actions.length > 0) {
        isFirstLoad = false
        return next()
    }


    if (isFirstLoad) {
        isFirstLoad = false
        await usersRepository.insertDefaultUsers()
        const status = await setUsersOnce()
        if (status) {
            return next()
        }
    } else {
        return next()
    }

})

app.use('/auth', authController)
app.use('/home', homeController)
app.use('/employee', employeeController)
app.use('/department', departController)
app.use('/shift', shiftController)
app.use('/users', userController)

app.listen(PORT, () => {
    console.log(`Server is running at http://127.0.0.1:${PORT}`);
})