const User = require("../Models/userModel")
const axios = require('axios')

const getUsersFromWS = async() => {
    const USERS_URL = 'https://jsonplaceholder.typicode.com/users'

    const {data: usersWS} = await axios.get(USERS_URL)
    return usersWS
}

const insertDefaultUsers = async() => {
    const existingUsers = await User.countDocuments()
    if (existingUsers === 0) {
    const usersWS = await getUsersFromWS()
    const defaultUsers = usersWS.map(user => {
        const obj = {}
        obj.userId = user.id 
        obj.username = user.username 
        obj.fullName = user.name
        obj.numOfActionsPerDay = 5
        return obj
    })
    await User.insertMany(defaultUsers)
    console.log('Default users inserted');
} else {
    console.log('Users already exist in the database');
}
}
insertDefaultUsers()

// User.post('save', async function(doc, next) {
//     await insertDefaultUsers()
//     next()
// })

//get all
const getAllUsers = async() => {
    return await User.find({})
}

//get by id
const getUserById = async(id) => {
    return await User.findById(id)
}
module.exports = {
    getAllUsers,
    getUserById
}


