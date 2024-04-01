const usersRepo = require('../Repositories/usersRepository')
const jf = require('jsonfile')
const path = require('path');
//const file = './Data/usersSistem.json'
const file = path.join(__dirname, '../Data/usersSistem.json');
const EventEmitter = require('events');

//insert to jsonfile
 let flag = false
 const setUsersOnce = async () => {
    //if(flag === false){
    // const users = await jf.readFile(file);
    //if (!flag) {
       const {actions} = await jf.readFile(file)
       console.log(actions); 
       console.log(file);   
     if(file.actions == null){
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
    flag = true
    console.log('Added basic users successfully');
    return 'Added basic users successfully'
    }
    else{
        console.log('Users have already been set');
    }
}

const ee = new EventEmitter();
ee.once('usersSet', async () => {
    try {
        await setUsersOnce()
    } catch (error) {
        console.error('Error:', error.message);
    }
});
//ee.emit('usersSet')

//setUsersOnce()
//.then(data => console.log(data)).catch(e => console.log(e))

const addNewRowToJSONFile = async (username) => {
    //  await setUsersOnce()
    //ee.emit('usersSet')
    try {
       
        //const { actions: usersData } = await jf.readFile(file);
        const usersData = await jf.readFile(file);
        console.log('usersData', usersData);

        const currentDate = `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`;
        const numOfActionsToday = usersData.actions.filter(user => user.username === username && user.date === currentDate).length;
        //const numOfActionsToday = usersData.filter(user => user.username === username && user.date === currentDate).length;
        const user = usersData.actions.find(user => user.username === username)
       // const user = usersData.find(user => user.username === username)
        if (!user) {
            console.log('User not found for the current date.');
            return 'User not found for the current date.';
        }
        const maxActions = user.maxActions
        const numActionsRemaining = +maxActions - (+numOfActionsToday);

        console.log('numActionsRemaining:', numActionsRemaining);

        const newRow = { ...user, numActionsAllowd: numActionsRemaining }
        if (numActionsRemaining >= 0) {
            usersData.actions.push(newRow);
            //usersData.push(newRow);
            await jf.writeFile(file, usersData , { spaces: 2 });
           // await jf.writeFile(file , {actions: usersData} , { spaces: 2 });
            console.log('New row added successfully.');
            return 'New row added successfully.';
        }
        else {
            console.log('Please wait until the next day.');
            return 'Please wait until the next day.';
        }
    } catch (err) {
        console.error('Error adding new row:', err.message);
        return 'Error adding new row.';
    }
};

//get all users from jsonfile - by username?
const getUsersFromJF = async() => {
    try {
        const usersList = await usersRepo.getAllUsers()
        const usernamesList = usersList.map(user => user.username)
        const {actions: usersData} = await jf.readFile(file);
        const recentInstance = usernamesList.map(uname => {
            const obj = {}
           const user = usersData.findLast(instance => instance.username === uname)
            obj.username = user.username,
            obj.fullName = user.fullName,
            obj.maxActions = user.maxActions,
            obj.numActionsAllowd = user.numActionsAllowd
            return obj
        })
        return recentInstance       

    } catch (err) {
        console.error('Error data to table:', err.message);
        return 'Error data to table:';
    }
}

//get all
const getAllUsers = async () => {
    return await usersRepo.getAllUsers()
}

//get by id
const getUserById = async (id) => {
    return await usersRepo.getUserById(id)
}

module.exports = {
    getAllUsers,
    getUserById,
    addNewRowToJSONFile,
    setUsersOnce,
    getUsersFromJF
}

