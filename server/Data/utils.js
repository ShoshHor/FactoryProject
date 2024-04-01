const usersRepo = require('../Repositories/usersRepository')
const jf = require('jsonfile')
const path = require('path');
//const file = './Data/usersSistem.json'
const file = path.join(__dirname, './usersSistem.json');
const EventEmitter = require('events');
//const usersData = jf.readFileSync(file);

//insert to jsonfile
 //let flag = false
 const setUsersOnce = async (req, res, next) => {
   // if(flag === false){
    // const users = await jf.readFile(file);
    //if (!flag) {
     //  const {actions} = await jf.readFile(file)
    //   console.log(actions);
    //if (usersData.actions == null) { 
       console.log(file);   
    // if(file.actions == null){
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
   // await jf.writeFile(file, insertUsersToJsonfile, { spaces: 2 })
    //flag = true
    console.log('Added basic users successfully');
    res.send('Added basic users successfully') 
    // }
    // else{
    //     console.log('Users have already been set');
    // }
    next()
}

module.exports = setUsersOnce