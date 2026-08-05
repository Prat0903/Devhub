const UserModel = require("../models/user.model");
const ApiError = require("../utils/apiError");

let updateUserProfileService = async (id, { title, bio, skills, github }) => {
  if (
    title === undefined &&
    bio === undefined &&
    skills === undefined &&
    github === undefined
  )
    throw new ApiError(400, "At least one field must be provided");

  let user = await UserModel.findById(id);

  if (!user) throw new ApiError(404, "User not found");

  if (title !== undefined) {
    if (title.trim().length < 4)
      throw new ApiError(400, "Title should be atleast 4 characters long");
    user.title = title;
  }

  if (bio !== undefined) {
    if (bio.trim().length < 30)
      throw new ApiError(400, "Bio should be atleast 30 characters long");
    user.bio = bio;
  }

  if (skills !== undefined) {
    if (skills.length < 2)
      throw new ApiError(400, "Need to have atleast 2 skills");
    user.skills = skills;
  }

  if (github !== undefined) {
    let githubRegex =
      /^https:\/\/github\.com\/[A-Za-z0-9](?:[A-Za-z0-9-]{0,37}[A-Za-z0-9])?\/?$/;
    if (!githubRegex.test(github))
      throw new ApiError(400, "Invalid URL format");
    user.github = github;
  }

  await user.save();

  return user;
};

module.exports = updateUserProfileService;
