const { ApolloServer } = require('apollo-server');
const monggose = require('mongoose')
const typeDefs = require('./models/schema')
const resolvers = require('./models/resolver')

monggose.connect("mongodb://localhost:27017/upercut")
monggose.connection.once('open', () => {
    console.log("Connected to MongoDB")
})
const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
