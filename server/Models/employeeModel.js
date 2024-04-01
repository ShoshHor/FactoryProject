const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    startWorkYear: Number,
    departmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'department',
        default: function() {
            if (!this.departmentId) {
                return null;
            }
    }
    },
    shiftsId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'shift',
        default: function() {
            if (!this.shiftsId) {
                return null;
            }
    }
    }]
},
    { versionKey: false , strictPopulation: false}
)

const Employee = mongoose.model('employee', employeeSchema)

module.exports = Employee