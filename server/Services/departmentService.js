const departmentRepo = require('../Repositories/departmentDAL')
const employeeRepo = require('../Repositories/employeesRepository')

//get all
const getAllDepartments = async() => {
    const departments = await departmentRepo.getAllDepartments()
    return departments
}

//get by id
const getDepartmentById = async (id) => {
    return await departmentRepo.getDepartmentById(id)
}

//create
const createDepartment = async (obj) => {
    const status = await departmentRepo.createDepartment(obj)
    console.log(status); 
    //const managId = obj.manager.toJSON()
    const managId = obj.manager
     //const employee = await employeeRepo.getEmployeeById(managId)
     const departs = await departmentRepo.getAllDepartments()
     const depart = departs.at(-1)
     console.log(depart);
     const upEmp = {departmentId : depart._id}
    const status2 = await employeeRepo.updateEmployee(managId, upEmp)
    return status2
}

//update
const updateDepartment = async (id, obj) => {
    //console.log(obj.manager);
     const managId = obj.manager
     const employee = await employeeRepo.getEmployeeById(managId)
     if(employee?.departmentId == id || employee == null){
         const status = await departmentRepo.updateDepartment(id, obj)
    return status
     }
   else{
    console.log('Choose another manager')
   }
}

//delete
const deleteDepartment = async (id) => {
    const status = await departmentRepo.deleteDepartment(id)
    return status
}

//get employee
const getEmployeesByDepartmentId = async(id) => {
    // const depart = await departmentRepo.getDepartmentById(id)
    // const id = depart._id
    const emps = await employeeRepo.getAllEmployees()
    const employs = emps.filter(em => em.departmentId === id)
    return employs
}

//getManagerName
const getManagerName = async (id) => {
    const depart = await departmentRepo.getDepartmentById(id)
    const managerId = depart.manager.toJSON()
    console.log(managerId);
    const emp = await employeeRepo.getEmployeeById(managerId)
    console.log(emp);
   const fullname = `${emp?.firstName} ${emp?.lastName}`
    return fullname
}

//all departments data
const getAllDepartsData = async () => {
    const departments = await departmentRepo.getAllDepartments()

    const departmentsData = Promise.all(departments.map(async(dep) => {
        const department = dep
    const employees = await employeeRepo.getAllEmployees()
        //const name = await departNameById(dep._id)
        const managerName = await getManagerName(dep._id)
       // const employeesNames = await getEmployeesNames(dep._id)
       const em = await getEmployeesByDepartmentId(dep._id)
       const hereEmp = employees.filter(emp =>  dep._id == emp.departmentId.toJSON())
        return { department, managerName, hereEmp, em}
            //employeesNames}
    }))
    return departmentsData
}

/////manager name
const departManagerName = async (id) => {
    const departAndManager = await departmentRepo.departManagerName(id)
    return departAndManager
}

module.exports = {
    getAllDepartments,
    getDepartmentById,
    createDepartment,
    updateDepartment,
    deleteDepartment,
    departManagerName,
    getAllDepartsData
}