let mongoose = require("mongoose");

let userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minLength: [6, "Password must at least 6 characters long"],
    },
  },
  {
    timestamps: true,
  },
);

let UserModel = mongoose.model("users", userSchema);

module.exports = UserModel;
