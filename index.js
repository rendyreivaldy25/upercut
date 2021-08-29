const { ApolloServer } = require('apollo-server');
const monggose = require('mongoose');
const typeDefs = require('./models/schema');
const resolvers = require('./models/resolver');
const contextAuth = require('./repositories/auth');
const errorHandling = require('./repositories/auth');
process.env.TZ = "Asia/Jakarta";

monggose.connect("mongodb://localhost:27017/upercut")
monggose.connection.once('open', () => {
    console.log("Connected to MongoDB")
})
const server = new ApolloServer(
        { 
            typeDefs, 
            resolvers, 
            context: contextAuth,  
            //formatError: errorHandling 
        }
    );
    server.listen().then(({ url }) => {
        console.log(`🚀  Server ready at ${url}`);
    });
    