const UserModel = require("../models/user.model");
const ApiError = require("../utils/apiError");
const ApiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");

let getAllUserController = asyncHandler(async (req, res) => {
  let users = await UserModel.find().select("name title bio skills github");
  return res
    .status(200)
    .json(new ApiResponse("All users fetched successfully", { users }));
});

let getUserByIdController = asyncHandler(async (req, res) => {
  let { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    throw new ApiError(404, "Invalid user ID");

  let user = await UserModel.findById(id).select(
    "name title bio skills github",
  );

  if (!user) throw new ApiError(404, "User not found");

  return res
    .status(200)
    .json(new ApiResponse("User fetched successfully", { user }));
});

module.exports = { getAllUserController, getUserByIdController };
