const mongoose = require('mongoose')
const axios = require('axios')

const userSchema = new mongoose.Schema({
    userId: Number,
    username: String,
    fullName: { type: String, required: true },
    numOfActionsPerDay: { type: Number, required: true }
},
    { versionKey: false }
)

const User = mongoose.model('user', userSchema)

module.exports = User