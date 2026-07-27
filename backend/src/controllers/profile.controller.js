const updateUserProfileService = require("../services/profile.service");
const ApiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");

let updateUserProfileController = asyncHandler(async (req, res) => {
  let { id } = req.user;

  let updatedProfile = await updateUserProfileService(id, req.body);

  return res
    .status(200)
    .json(
      new ApiResponse("Profile updated successully", { user: updatedProfile }),
    );
});

module.exports = updateUserProfileController;
