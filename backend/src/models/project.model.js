let mongoose = require("mongoose");

let projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    techStack: [
      {
        type: String,
        required: true,
      },
    ],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    githubUrl: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  },
);

let ProjectModel = mongoose.model("projects", projectSchema);

module.exports = ProjectModel;
