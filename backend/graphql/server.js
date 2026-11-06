const { ApolloServer } = require("@apollo/server");
const typeDefs = require("./schema.js");
const resolvers = require("./resolvers.js");
const { startStandaloneServer } = require("@apollo/server/standalone");

const startServer = (port) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  startStandaloneServer(server, {
    listen: { port },
  }).then(({ url }) => {
    console.log(`Server ready at ${url}`);
  });
};

module.exports = startServer;
