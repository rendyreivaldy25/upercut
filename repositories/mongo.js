const company = require('../models/company');
const employee = require('../models/employee');
const service = require('../services/common');
const moment = require('moment');
const { db } = require('../models/company');
var ObjectId = require('mongoose').Types.ObjectId;

const getCompanies = async function() {
    return await company.find()
}

const getCompanyById = async function(id){
    if(!ObjectId.isValid(id)) return []
    return await company.find(id)
}

const getEmployees = async function() {
    return await employee.find()
}

const getMyEmployees = async function(id) {
    if(!ObjectId.isValid(id)) return []
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
    return resultInsert ? {status: true, message : ""} : {status: false, message : "Failed to Insert Data"};
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
    return resultInsert ? {status: true, message : ""} : {status: false, message : "Failed to Insert Data"};
}

const updateCompany = async function(args) {
    if(!ObjectId.isValid(args._id)) return {status: false, message : "Id is not valid"};
    let dataCompany = {
        name: args.name, 
        email: args.email, 
        password : args.password
    }
    let where = {_id: args._id};
    resultEdit = await company.updateOne(where, dataCompany);
    return resultEdit ? {status: true, message : ""} : {status: false, message : "Failed to Update Data"};
}

const updateEmployee = async function(args) {
    if(!ObjectId.isValid(args._id)) return {status: false, message : "Id is not valid"};
    let dataEmployee = {
        firstname: args.firstname, 
        lastname: args.lastname, 
        email: args.email, 
        password : args.password,
        companyid : args.companyid
    }
    let where = {_id: args._id};
    resultEdit = await employee.updateOne(where, dataEmployee);
    return resultEdit ? {status: true, message : ""} : {status: false, message : "Failed to Update Data"};
}

const deleteEmployee = async function(id) {
    if(!ObjectId.isValid(id)) return {status: false, message : "Id is not valid"};
    resultDelete = await employee.deleteOne({_id:id})
    return resultDelete.deletedCount === 1 ? {status: true, message : ""} : {status: false, message : "Failed to Delete Data"};
}

const deleteCompany = async function(id) {
    if(!ObjectId.isValid(id)) return {status: false, message : "Id is not valid"};
    resultDelete = await company.deleteOne({_id:id})
    console.log(resultDelete);
    return resultDelete.deletedCount === 1 ? {status: true, message : ""} : {status: false, message : "Failed to Delete Data"};
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
        $set: { 
            token: token,
            lastLogin: moment().format('YYYY-MM-DD HH:mm:ss') 
        }
    }
    if(loginEmployeeCheck.length > 0){
        let where = {_id: loginEmployeeCheck[0]._id.toString()};
        await employee.updateOne(where, update);
        return {
            status : true,
            token : token
        };
    } else if( loginCompanyCheck.length > 0) {
        let where = {_id: loginCompanyCheck[0]._id.toString()};
        await company.updateOne(where, update);
        return {
            status : true,
            token : token
        };
    } else {
        return {
            status : false,
            token : "User not registered"
        };
    }
}

const authenticateToken = async function(token){
    if (token.length === 0){
        return {
            status : false,
            token: token,
            message: "Token Empty"
        }
    }
    var condition = {
        token: token
    }
    var loginEmployeeCheck = await employee.find(condition);
    var loginCompanyCheck = await company.find(condition);
    if(loginEmployeeCheck.length > 0 || loginCompanyCheck.length > 0) {
        var loginDate = loginEmployeeCheck.length > 0 ? 
            loginEmployeeCheck[0].lastLogin : 
            loginCompanyCheck[0].lastLogin;
        var tokenCheck = service.checkLastLoginDateTime(loginDate);
        tokenCheck.token = token;
        return tokenCheck;
    }
    return {
        status : false,
        token: token,
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