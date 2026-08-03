let mongoose = require("mongoose");

let blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    tags: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    coverImage: {
      type: String,
      default: "",
    },
    published: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

let BlogModel = mongoose.model("blogs", blogSchema);

module.exports = BlogModel;
