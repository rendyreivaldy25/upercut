const monggose = require('mongoose');
const Schema = monggose.Schema;

const companySchema = new Schema({
    name: String,
    email : String,
    password : String,
    token: String,
    lastLogin: String
});

module.exports = monggose.model('Company', companySchema);