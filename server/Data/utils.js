const usersRepo = require('../Repositories/usersRepository')
const jf = require('jsonfile')
const path = require('path');
const file = path.join(__dirname, './usersSistem.json');
const EventEmitter = require('events');

//insert to jsonfile
const setUsersOnce = async () => {
    
         const currentDate = new Date();
         const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
         const usersFromDB = await usersRepo.getAllUsers()
         const insertUsersToJsonfile = usersFromDB.map(user => {
             const obj = {}
             obj.userId = user.userId
             obj.username = user.username
             obj.fullName = user.fullName
             obj.maxActions = user.numOfActionsPerDay
             obj.date = formattedDate
             obj.numActionsAllowd = user.numOfActionsPerDay
             return obj
         })
         await jf.writeFile(file, {actions: insertUsersToJsonfile}, { spaces: 2 })
       
         console.log('Added basic users successfully');
        
        return true
}

module.exports = setUsersOnce