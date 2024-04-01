const Shift = require('../Models/shiftModel')

//get all - shift + ref employee
const getAllShifts = async () => {
    return await Shift.find({}).populate('employeesId')
}

//get by id
const getShiftById = async (id) => {
    return await Shift.findById(id)
    //.populate('employeesId')
}

//create
const createNewShift = async (obj) => {
    const shift = new Shift(obj)
    await shift.save()
    return 'Created'
}

//update
const updateShift = async (id, obj) => {
    await Shift.findByIdAndUpdate(id, obj)
    return 'Updated'
}

module.exports = {
    getAllShifts,
    getShiftById,
    createNewShift,
    updateShift,
}