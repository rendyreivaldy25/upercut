const company = require('../models/company');
const employee = require('../models/employee');

const getCompanies = async function() {
    return await company.find()
}

const getCompanyById = async function(id){
    return await company.findById(id)
}

const getEmployees = async function() {
    return await employee.find()
}

const getMyEmployees = async function(id) {
    return await employee.find({companyid:id})
}

const insertCompany = async function(args) {
    let dataCompany = {
        name: args.name, 
        email: args.email, 
        password : args.password
    }
    resultInsert = await company.create(dataCompany);
    return resultInsert ? true : false;
}

const insertEmployee = async function(args) {
    let dataEmployee = {
        firstname: args.firstname, 
        lastname: args.lastname, 
        email: args.email, 
        password : args.password,
        companyid : args.companyid
    }
    resultInsert = await employee.create(dataEmployee);
    return resultInsert ? true : false;
}

const updateCompany = async function(args) {
    let dataCompany = {
        name: args.name, 
        email: args.email, 
        password : args.password
    }
    let where = {_id: args._id};
    resultEdit = await company.updateOne(where, dataCompany);
    return resultEdit ? true : false;
}

const updateEmployee = async function(args) {
    let dataEmployee = {
        firstname: args.firstname, 
        lastname: args.lastname, 
        email: args.email, 
        password : args.password,
        companyid : args.companyid
    }
    let where = {_id: args._id};
    resultEdit = await employee.updateOne(where, dataEmployee);
    return resultEdit ? true : false;
}

const deleteEmployee = async function(id) {
    resultDelete = await employee.deleteOne({_id:id})
    return resultDelete.deletedCount === 1 ? true : false;
}

const deleteCompany = async function(id) {
    resultDelete = await company.deleteOne({_id:id})
    console.log(resultDelete);
    return resultDelete.deletedCount === 1 ? true : false;
}

module.exports = {
    getCompanies,
    getCompanyById,
    getEmployees,
    getMyEmployees,
    insertCompany,
    insertEmployee,
    updateCompany,
    updateEmployee,
    deleteEmployee,
    deleteCompany
}