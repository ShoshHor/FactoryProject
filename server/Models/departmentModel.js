const mongoose = require('mongoose')
//const Schema = mongoose.Schema

const departmentSchema = new mongoose.Schema(
    {
        name: String,
        manager: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "employee",
        }
    //         default: function() {
    //             if (this.manager === '') {
    //                 return null;
    //             } else {
    //                 return mongoose.Types.ObjectId();
    //             }               
    // }
    },   
    { versionKey: false, strictPopulate: false },
)

const Department = mongoose.model('department', departmentSchema)

module.exports = Department














