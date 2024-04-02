const usersRepo = require('../Repositories/usersRepository')
const jf = require('jsonfile')
const path = require('path');
const file = path.join(__dirname, '../Data/usersSistem.json');


const addNewRowToJSONFile = async (username) => {
  
    try {
       
        const usersData = await jf.readFile(file);
        console.log('usersData', usersData);

        const currentDate = `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`;
        const numOfActionsToday = usersData.actions.filter(user => user.username === username && user.date === currentDate).length;
        const user = usersData.actions.find(user => user.username === username)
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
            await jf.writeFile(file, usersData , { spaces: 2 });
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



const getUsersActions = async () => {
    const {actions} = await jf.readFile(file);
    return actions

}


module.exports = {
    getAllUsers,
    getUserById,
    addNewRowToJSONFile,
    getUsersFromJF,
    getUsersActions
}

