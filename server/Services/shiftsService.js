const shiftsRepo = require('../Repositories/shiftsRepository')

//get all - shift + ref employee
const getAllShifts = async() => {
    return await shiftsRepo.getAllShifts()
}

//get by id
const getShiftById = async(id) => {
    return await shiftsRepo.getShiftById(id)
}

//create
const createNewShift = async(obj) => {
    const status = await shiftsRepo.createNewShift(obj)
    return status
}

//update
const updateShift = async(id, obj) => {
    const status = await shiftsRepo.updateShift(id, obj)
    return status
}


module.exports = {
    getAllShifts,
    getShiftById,
    createNewShift,
    updateShift
}