const axios = require('axios')

const USERS_URL = 'https://jsonplaceholder.typicode.com/users'

const getUserByUserName = (username) => {
     return axios.get(`${USERS_URL}?username=${username}`)   
}

module.exports = {getUserByUserName}