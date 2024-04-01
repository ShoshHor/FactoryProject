const employeesRepo = require('../Repositories/employeesRepository')
const departmentRepo = require('../Repositories/departmentDAL')
const shiftsRepo = require('../Repositories/shiftsRepository')

//get all
const getAllEmployees = async () => {
    return await employeesRepo.getAllEmployees()
}

//get by id
const getEmployeeById = async (id) => {
    return await employeesRepo.getEmployeeById(id)
}

//get full dete by id
const getFullDataEmployee = async (id) => {
    return await employeesRepo.getFullDataEmployee(id)
}

//create
const createNewEmployee = async (obj) => {
    const status = await employeesRepo.createNewEmployee(obj)
    return status
}

//update
const updateEmployee = async (id, obj) => {
    const status = await employeesRepo.updateEmployee(id, obj)
    return status
}

const deleteEmployee = async(id) => {
    const deps = await departmentRepo.getAllDepartments()
   const ifManager = deps.find(dep => dep.manager == id)
   if(ifManager !== undefined){
    const upManager = {manager: '000000000000000000000000'}
    const status = await departmentRepo.updateDepartment(ifManager._id, upManager)
    console.log(status);
   }
   const shifts = await shiftsRepo.getAllShifts()
   shifts.map(async(shi) => {
    const emId = shi.employeesId.find(emId => emId === id)
    if(emId !== undefined){
    const upEmpsId = shi.employeesId.filter(emId => emId !== id)
    const obj = {employeesId: upEmpsId}
    const status2 = await shiftsRepo.updateShift(shi._id, obj)
    console.log(status2);
    }
   })
    const status3 = await employeesRepo.deleteEmployee(id)
    return status3
}

//get fullname
const getFullnameById = async (id) => {
    const employee = await employeesRepo.getEmployeeById(id)
    const fullname = `${employee.firstName} ${employee.lastName}`
    return fullname
}

//employee's department
const getDepartmentToEmployee = async (id) => {
    const employee = await employeesRepo.getEmployeeById(id)
    const department = employee.departmentId
    const thisDepart = await departmentRepo.getDepartmentById(department)
    return thisDepart
    //.name
}

//employee's shifts
const getShiftsToEmployee = async (id) => {
    const employee = await employeesRepo.getEmployeeById(id)
    const shiftsId = employee.shiftsId
    console.log(shiftsId);
    const shiftsData = Promise.all(shiftsId.map(async (shId) => {
        const singleShift = await shiftsRepo.getShiftById(shId)
        const obj = {}
        obj.date = singleShift.date
        obj.time = `${singleShift.startingHour}-${singleShift.endingHour}`
        return obj
    }))
    console.log(shiftsData);
    return shiftsData

}
const getAllEmployeeData = async (id) => {
    const data = {
        employee: await getEmployeeById(id),
        fullname: await getFullnameById(id),
        department: await getDepartmentToEmployee(id),
        allShifts: await getShiftsToEmployee(id)
    }
    return data
}

const employeesData = async (username) => {
    console.log('Username in service:', username);
    const employees = await employeesRepo.getAllEmployees()
    //const employees = await employeesRepo.getAllEmploWithFilter(depId)
    const empData = Promise.all(employees.map(async (emp) => {
        const resp = await getAllEmployeeData(emp._id)
        return resp
    }))
    return empData
}

module.exports = {
    getAllEmployees,
    getEmployeeById,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getFullnameById,
    getDepartmentToEmployee,
    getShiftsToEmployee,
    getAllEmployeeData,
    employeesData,
    getFullDataEmployee
}