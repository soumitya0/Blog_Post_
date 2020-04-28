const mongoose = require("mongoose");
const config = require("config");

const DBurl = config.get("URL");

const connectDB = async () => {
  try {
    console.log(DBurl);
    mongoose.connect(DBurl, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log("mongoose connected");
  } catch (error) {
    console.log("Error MongoDb");
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
