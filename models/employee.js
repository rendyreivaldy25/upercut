const monggose = require('mongoose');
const Schema = monggose.Schema;

const employeeSchema = new Schema({
    firstname: String,
    lastname: String,
    email : String,
    password : String,
    companyid: String,
    token: String,
    lastLogin: String
});

module.exports = monggose.model('Employee', employeeSchema);