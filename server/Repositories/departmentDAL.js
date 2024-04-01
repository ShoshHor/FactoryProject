const Department = require('../Models/departmentModel')

//get all
const getAllDepartments = async() => {
    const departments = await Department.find({})
    return departments
}

//get by id
const getDepartmentById = async(id) => {
    return await Department.findById(id)
}

//create
const createDepartment = async(obj) => {
    const depart = new Department(obj)
    await depart.save()
    return 'Created!'
}

//update
const updateDepartment = async(id, obj) => {
    await Department.findByIdAndUpdate(id, obj)
    return 'Updated!'
}

//delete
const deleteDepartment = async(id) => {
    await Department.findByIdAndDelete(id)
    return 'Deleted!'
}

//////department manager name by id
//http://127.0.0.1:8080/department/65c1f3709b973f05078446bd/managername
const departManagerName = async(id) => {
    const departAndManager = await Department.findById(id).populate('manager')
    //.populate({ path: 'employee', select: 'name' }).exec()   
    console.log(departAndManager);
    return departAndManager
} 

//department employees name by id

module.exports = {
    getAllDepartments,
    getDepartmentById,
    createDepartment,
    updateDepartment,
    deleteDepartment,
    departManagerName
}