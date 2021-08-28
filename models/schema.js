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
}

type Query {
    health: String
    getCompanies: [Company]
    getCompanyById(id: String): Company
    getEmployees: [Employee]
    getMyEmployees(companyid: String): [Employee]
}

type Mutation {
    insertCompany(name : String, email : String, password : String) : Boolean
    insertEmployee(firstname : String, lastname : String, email : String, password : String, companyid: String) : Boolean
    updateCompany(_id: String, name : String, email : String, password : String) : Boolean
    updateEmployee(_id: String, firstname : String, lastname : String, email : String, password : String, companyid: String) : Boolean
    deleteCompany(_id: String) : Boolean
    deleteEmployee(_id: String) : Boolean
}
`;

module.exports = typeDefs;