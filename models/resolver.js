const repo = require('../repositories/mongo');
const log = require('../repositories/log');

const resolvers = {
    Query: {
        health(parent, args, context, info) {
            let response = "Healthy";
            log.logData(`# health\nargs: ${JSON.stringify(args)}\ncontext: ${JSON.stringify(context)}\nresponse : ${JSON.stringify(response)}`);
            return response;
        },
        async getCompanies(parent, args, context, info) {
            let response = await repo.getCompanies();
            log.logData(`# getCompanies\nargs: ${JSON.stringify(args)}\ncontext: ${JSON.stringify(context)}\nresponse : ${JSON.stringify(response)}`);
            return response;
        },
        async getCompanyById(parent, args, context, info) {
            let response = await repo.getCompanyById(args.id);
            log.logData(`# getCompanyById\nargs: ${JSON.stringify(args)}\ncontext: ${JSON.stringify(context)}\nresponse : ${JSON.stringify(response)}`);
            return response;
        },
        async getEmployees(parent, args, context, info) {
            let response = await repo.getEmployees();
            log.logData(`# getEmployees\nargs: ${JSON.stringify(args)}\ncontext: ${JSON.stringify(context)}\nresponse : ${JSON.stringify(response)}`);
            return response;
        },
        async getMyEmployees(parent, args, context, info) {
            let response = await repo.getMyEmployees(args.companyid);
            log.logData(`# getMyEmployees\nargs: ${JSON.stringify(args)}\ncontext: ${JSON.stringify(context)}\nresponse : ${JSON.stringify(response)}`);
            return response;
        },
    },
    Mutation: {
        async insertCompany(parent, args, context, info) {
            log.logData(`# insertCompany\nargs: ${JSON.stringify(args)}\ncontext: ${JSON.stringify(context)}`);
            if(!context.authenticateResult.status) return context.authenticateResult;
            let response = await repo.insertCompany(args);
            log.logData(`response : ${JSON.stringify(response)}`);
            return response;
        },
        async insertEmployee(parent, args, context, info) {
            log.logData(`# insertEmployee\nargs: ${JSON.stringify(args)}\ncontext: ${JSON.stringify(context)}`);
            if(!context.authenticateResult.status) return context.authenticateResult;
            let response = await repo.insertEmployee(args);
            log.logData(`response : ${JSON.stringify(response)}`);
            return response;
        },
        async updateCompany(parent, args, context, info) {
            log.logData(`# updateCompany\nargs: ${JSON.stringify(args)}\ncontext: ${JSON.stringify(context)}`);
            if(!context.authenticateResult.status) return context.authenticateResult;
            let response = await repo.updateCompany(args);
            log.logData(`response : ${JSON.stringify(response)}`);
            return response;
        },
        async updateEmployee(parent, args, context, info) {
            log.logData(`# updateEmployee\nargs: ${JSON.stringify(args)}\ncontext: ${JSON.stringify(context)}`);
            if(!context.authenticateResult.status) return context.authenticateResult;
            let response = await repo.updateEmployee(args);
            log.logData(`response : ${JSON.stringify(response)}`);
            return response;
        },
        async deleteCompany(parent, args, context, info) {
            log.logData(`# deleteCompany\nargs: ${JSON.stringify(args)}\ncontext: ${JSON.stringify(context)}`);
            if(!context.authenticateResult.status) return context.authenticateResult;
            let response = await repo.deleteCompany(args._id);
            log.logData(`response : ${JSON.stringify(response)}`);
            return response;
        },
        async deleteEmployee(parent, args, context, info) {
            log.logData(`# deleteEmployee\nargs: ${JSON.stringify(args)}\ncontext: ${JSON.stringify(context)}`);
            if(!context.authenticateResult.status) return context.authenticateResult;
            let response = await repo.deleteEmployee(args._id);
            log.logData(`response : ${JSON.stringify(response)}`);
            return response;
        },
        async login(parent, args, context, info) {
            let response = await repo.login(args);
            log.logData(`# login\nargs: ${JSON.stringify(args)}\ncontext: ${JSON.stringify(context)}\nresponse : ${JSON.stringify(response)}`);
            return response;
        }

    }
};

module.exports = resolvers;