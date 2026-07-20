const UserModel = require("../models/user.model");
let bcrypt = require("bcrypt");
const generateToken = require("../utils/token");
const {
  registerService,
  loginService,
  logoutService,
} = require("../services/auth.service");
const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/apiResponse");

let registerController = asyncHandler(async (req, res) => {
  let { newUser, token } = await registerService(req.body);

  res.cookie("token", token);

  return res
    .status(201)
    .json(new ApiResponse("User registered successfully", newUser));
});

let loginController = asyncHandler(async (req, res) => {
  let { isExisting, token } = await loginService(req.body);

  return res
    .status(200)
    .json(new ApiResponse("User logged in", isExisting));
});

let logoutController = asyncHandler(async (req, res) => {
  res.clearCookie("token");

  return res.status(200).json(new ApiResponse("User logged out"));
});

module.exports = {
  registerController,
  loginController,
  logoutController,
};
