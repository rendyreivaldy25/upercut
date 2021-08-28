const company = require('../models/company');
const employee = require('../models/employee');
const service = require('../services/common');
const moment = require('moment');

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
        password : args.password,
        token: "",
        lastLogin: ""
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
        companyid : args.companyid,
        token: "",
        lastLogin: ""
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

const login = async function(args) {
    var condition = {
        email: args.email,
        password: args.password
    }
    var loginEmployeeCheck = await employee.find(condition);
    var loginCompanyCheck = await company.find(condition)
    var token = service.getRandomToken();
    var update = {
        token: token,
        lastLogin: moment().format('YYYY-MM-DD HH:mm:ss')
    }
    console.log([loginEmployeeCheck, loginCompanyCheck]);
    if(loginEmployeeCheck.length > 0){
        let where = {_id: loginEmployeeCheck[0]._id};
        console.log([where, update])
        employee.updateOne(where, update);
        return {
            status : true,
            token : token
        };
    } else if( loginCompanyCheck.length > 0) {
        let where = {_id: loginCompanyCheck[0]._id};
        company.updateOne(where, update);
        return {
            status : true,
            token : token
        };
    } else {
        return {
            status : false,
            token : ""
        };
    }
}

const authenticateToken = async function(token){
    var condition = {
        token: token
    }
    var loginEmployeeCheck = await employee.find(condition);
    var loginCompanyCheck = await company.find(condition)
    if(loginEmployeeCheck.length > 0 || loginCompanyCheck.length > 0) {
        var loginDate = loginEmployeeCheck.length > 0 ? 
            loginEmployeeCheck[0].token : 
            loginCompanyCheck[0].token;
        var tokenCheck = service.checkLastLoginDateTime(loginDate);
        return tokenCheck;
    }
    return {
        status : false,
        message: "Token Invalid"
    };
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
    deleteCompany,
    login,
    authenticateToken
}