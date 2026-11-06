const mongoose = require("mongoose");

const connectToDB = async (uri) => {
  console.log("connecting to database URI: ", uri);

  try {
    await mongoose.connect(uri);
    console.log("connected to mongoDB");
  } catch (error) {
    console.error("error connecting to mongoDB", error.message);
    process.exit(1);
  }
};

module.exports = connectToDB;
