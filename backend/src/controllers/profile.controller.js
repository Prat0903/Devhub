const UserModel = require("../models/user.model");
const updateUserProfileService = require("../services/profile.service");
const ApiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");

let getMyUserProfileController = asyncHandler(async (req, res) => {
  let user = await UserModel.findById(req.user._id).select(
    "name email title bio skills github",
  );

  return res.status(200).json(new ApiResponse("Profile fetched", user));
});

let updateUserProfileController = asyncHandler(async (req, res) => {
  let { id } = req.user;

  let user = await updateUserProfileService(id, req.body);

  return res
    .status(200)
    .json(new ApiResponse("Profile updated successully", { user }));
});

module.exports = { updateUserProfileController, getMyUserProfileController };
