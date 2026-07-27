const UserModel = require("../models/user.model");
const ApiError = require("../utils/apiError");

let updateUserProfileService = async (id, { title, bio, skills, github }) => {
  if (title.trim().length < 4)
    throw new ApiError(400, "Title should be atleast 4 characters lonng");

  if (bio.trim().length < 30)
    throw new ApiError(400, "Bio should be atleast 30 characters long");

  if (skills.length <= 1)
    throw new ApiError(400, "Need to have atleast 2 skills");

  let githubRegex =
    /^https:\/\/github\.com\/[A-Za-z0-9](?:[A-Za-z0-9-]{0,37}[A-Za-z0-9])?\/?$/;
  if (!githubRegex.test(github)) throw new ApiError(400, "Invalid URL format");

  let updatedProfile = await UserModel.findByIdAndUpdate(
    id,
    {
      title,
      bio,
      skills,
      github,
    },
    {
      new: true,
    },
  );

  if (!updatedProfile) throw new ApiError(404, "User not found");

  return updatedProfile;
};

module.exports = updateUserProfileService;
