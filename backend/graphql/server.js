const { ApolloServer } = require("@apollo/server");
const typeDefs = require("./schema.js");
const resolvers = require("./resolvers.js");
const { startStandaloneServer } = require("@apollo/server/standalone");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const getUserFromAuthHeader = async (auth) => {
  if (!auth || !auth.startsWith("Bearer ")) return null;

  const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET);
  return User.findById(decodedToken.id).populate("friends");
};

const startServer = (port) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
  });

  startStandaloneServer(server, {
    listen: { port },
    context: async ({ req }) => {
      const auth = req.headers.authorization;
      const currentUser = await getUserFromAuthHeader(auth);
      return { currentUser };
    },
  }).then(({ url }) => {
    console.log(`Server ready at ${url}`);
  });
};

module.exports = startServer;
