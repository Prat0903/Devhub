let mongoose = require("mongoose");

let connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Mongodb connected!!");
  } catch (error) {
    console.log("Error in connecting db", error);
  }
};

module.exports = connectDb;
