const { ApolloServer, gql } = require('apollo-server');
const monggose = require('mongoose')
const repo = require('./repositories/mongo')

monggose.connect("mongodb://localhost:27017/upercut")
monggose.connection.once('open', () => {
    console.log("Connected to MongoDB")
})

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
`;

const resolvers = {
    Query: {
        health: () => "Healthy",
        getCompanies: () => repo.getCompanies(),
        getCompanyById: () => repo.getCompanyById(id),
        getCompanyById(parent, args, context, info) {
            return repo.getCompanyById(args.id);
        },
        getEmployees: () => repo.getEmployees(),
        getMyEmployees(parent, args, context, info) {
            return repo.getMyEmployees(args.companyid);
        },
    },
};


// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
