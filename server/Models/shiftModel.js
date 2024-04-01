const mongoose = require('mongoose')

const shiftSchema = new mongoose.Schema({
    date: String,
    startingHour: String,
    endingHour: String,
    employeesId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employee'
    }]
},
    { versionKey: false , strictPopulate: false}
)

const Shift = mongoose.model('shift', shiftSchema)

module.exports = Shift