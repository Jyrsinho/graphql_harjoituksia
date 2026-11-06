require("dotenv").config();

const startServer = require("./graphql/server.js");
const connectToDB = require("./db.js");

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 4000;

const main = async () => {
  await connectToDB(MONGODB_URI);
  startServer(PORT);
};
main();
