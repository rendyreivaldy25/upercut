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

module.exports = {
    getCompanies,
    getCompanyById,
    getEmployees,
    getMyEmployees
}