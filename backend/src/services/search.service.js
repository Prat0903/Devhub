const BlogModel = require("../models/blog.model");
const ProjectModel = require("../models/project.model");
const UserModel = require("../models/user.model");

let searchService = async (q) => {
  //searching from projects collection
  let projects = await ProjectModel.find({
    $or: [
      {
        title: {
          $regex: q,
          $options: "i",
        },
      },
      {
        description: {
          $regex: q,
          $options: "i",
        },
      },
      {
        techStack: {
          $regex: q,
          $options: "i",
        },
      },
    ],
  });

  //searching from users collection
  let users = await UserModel.find({
    $or: [
      {
        name: {
          $regex: q,
          $options: "i",
        },
      },
      {
        title: {
          $regex: q,
          $options: "i",
        },
      },
      {
        bio: {
          $regex: q,
          $options: "i",
        },
      },
      {
        skills: {
          $regex: q,
          $options: "i",
        },
      },
    ],
  });

  //searching from blogs collection
  let blogs = await BlogModel.find({
    $or: [
      {
        title: {
          $regex: q,
          $options: "i",
        },
      },
      {
        content: {
          $regex: q,
          $options: "i",
        },
      },
      {
        tags: {
          $regex: q,
          $options: "i",
        },
      },
    ],
  });

  return { projects, users, blogs };
};

module.exports = { searchService };
