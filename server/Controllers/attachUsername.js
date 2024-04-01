const usersService = require('../Services/usersService')

const attachUsername = async(req, res, next) => {  
    const username = req.headers['x-username']
    req.username = username;
    console.log('Username:', username);
    try{      
       // await usersService.setUsersOnce()
        await usersService.addNewRowToJSONFile(username)
    next()
}catch(error){
    console.log(error);
}
}

module.exports = attachUsername