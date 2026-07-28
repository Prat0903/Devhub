let mongoose = require("mongoose");

let projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
  },
});
