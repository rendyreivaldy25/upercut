const { gql } = require('apollo-server');

const typeDefs = gql`
type Company {
    _id: String
    name: String
    email: String
}

type Employee {
    _id: String
    firstname: String
    lastname: String
    email: String
    companyid: String
    lastLogin: String
}

type LoginResponse {
    status : Boolean
    token : String
}

type Response {
    status : Boolean
    message : String
}

type Query {
    health: String
    getCompanies: [Company]
    getCompanyById(id: String): Company
    getEmployees: [Employee]
    getMyEmployees(companyid: String): [Employee]
}

type Mutation {
    insertCompany(name : String, email : String, password : String) : Response
    insertEmployee(firstname : String, lastname : String, email : String, password : String, companyid: String) : Response
    updateCompany(_id: String, name : String, email : String, password : String) : Response
    updateEmployee(_id: String, firstname : String, lastname : String, email : String, password : String, companyid: String) : Response
    deleteCompany(_id: String) : Response
    deleteEmployee(_id: String) : Response
    login(email : String, password : String) : LoginResponse
}
`;

module.exports = typeDefs;