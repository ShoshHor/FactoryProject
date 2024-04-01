const Employee = require('../Models/employeeModel')

//get all
const getAllEmployees = async () => {
    return await Employee.find({})
}

//get all with filter
const getAllEmploWithFilter = async (depId) => {
    return await Employee.find({"departmentId":depId})
}

//get by id
const getEmployeeById = async(id) => {
    return await Employee.findById(id)
}

//get full data by id
const getFullDataEmployee = async (id) => {
    return await Employee.findById(id).populate('departmentId').populate('shiftsId')
}

//create
const createNewEmployee = async (obj) => {
    const employee = new Employee(obj)
    await employee.save()
    return 'Created!'
}

//update
const updateEmployee = async (id, obj) => {
    await Employee.findByIdAndUpdate(id, obj)
    return "Updated!"
}

//delete
const deleteEmployee = async (id) => {
    await Employee.findByIdAndDelete(id)
    return "Deleted!"
}

module.exports = {
    getAllEmployees,
    getEmployeeById,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getFullDataEmployee,
    getAllEmploWithFilter
}