const { GraphQLError } = require("graphql");
const Person = require("../models/Person");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const resolvers = {
  Query: {
    personCount: async () => Person.countDocuments(),
    allPersons: async (root, args) => {
      if (!args.phone) return Person.find({});
      return Person.find({ phone: { $exists: args.phone === "YES" } });
    },
    findPerson: async (root, args) => Person.findOne({ name: args.name }),
    me: async (root, args, context) => context.currentUser,
  },
  Person: {
    address: ({ street, city }) => {
      return {
        street: street,
        city: city,
      };
    },
  },
  Mutation: {
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
      });

      return user.save().catch((error) => {
        throw new GraphQLError("Creating the user failed", error, {
          extensions: {
            code: "BAD USER_INPUT",
            invalidArgs: args.username,
            error,
          },
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      if (!user || args.password !== "secret") {
        throw new GraphQLError("Wrong Credentials!", {
          extensions: {
            code: "BAD USER_INPUT",
          },
        });
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      };
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
    addPerson: async (root, args, context) => {
      const currentUser = context.currentUser;
      //TODO miksi uudet ihmiset eivät päivity kirjautuneen käyttäjän kavereiksi??
      console.log("addPerson currentUser - ", currentUser);
      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "Unauthenticated",
          },
        });
      }
      const nameExists = await Person.exists({ name: args.name });
      if (nameExists) {
        throw new GraphQLError(`Name must be unique ${args.name}`, {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
          },
        });
      }
      const person = new Person({ ...args });
      try {
        await person.save();
        currentUser.friends = currentUser.friends.concat(person);
        await currentUser.save();
      } catch (error) {
        throw new GraphQLError(`saving Person failed: ${error.message}`, {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      }
      return person;
    },
    editNumber: async (root, args) => {
      const person = await Person.findOne({ name: args.name });
      if (!person) return null;

      person.phone = args.phone;
      try {
        await person.save;
      } catch (error) {
        throw new GraphQLError(`saving number failed: ${error.message}`, {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      }
      return person;
    },
    addAsFriend: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "Unauthenticated",
          },
        });
      }

      const notFriendAlready = (person) => {
        return !currentUser.friends.map((friend) =>
          friend.id.toString().includes(person._id.toString()),
        );
      };
      const person = await Person.findOne({ name: args.name });
      if (!person) {
        throw new GraphQLError(`The name was not found, ${args.name}`, {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
          },
        });
      }
      if (notFriendAlready(person)) {
        currentUser.friends = currentUser.friends.concat(person);
      }
      await currentUser.save();
      return currentUser;
    },
  },
};

module.exports = resolvers;
