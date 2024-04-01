const authRepo = require('../Repositories/authRepository')

const authUser = async(username, email) => {
    const {data} = await authRepo.getUserByUserName(username)
    const user = data[0]
    if(!user) return {success: false, message: "Username not found"}

  
    console.log(user)

    if(user.email !== email) return {success: false, message: 'Wrong email'}
    return {success: true, message: 'Login successful'}
}

module.exports = {authUser}