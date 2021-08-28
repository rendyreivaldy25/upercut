const repo = require('./../repositories/mongo');

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
    Mutation: {
        insertCompany(parent, args, context, info) {
            return repo.insertCompany(args);
        },
        insertEmployee(parent, args, context, info) {
            return repo.insertEmployee(args);
        },
        updateCompany(parent, args, context, info) {
            return repo.updateCompany(args);
        },
        updateEmployee(parent, args, context, info) {
            return repo.updateEmployee(args);
        },
        deleteCompany(parent, args, context, info) {
            return repo.deleteCompany(args._id);
        },
        deleteEmployee(parent, args, context, info) {
            return repo.deleteEmployee(args._id);
        },
        login(parent, args, context, info) {
            return repo.login(args);
        }

    }
};

module.exports = resolvers;