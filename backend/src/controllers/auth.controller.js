const UserModel = require("../models/user.model");
let bcrypt = require("bcrypt");
const generateToken = require("../utils/token");
const { registerService, loginService } = require("../services/auth.service");
const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/apiResponse");

let registerController = asyncHandler(async (req, res) => {
  try {
    let { newUser, token } = await registerService(req.body);

    res.cookie("token", token);

    return res
      .status(201)
      .json(new ApiResponse("User registered successfully", newUser));
  } catch (error) {
    console.log(error);
    return res.status(500).json(new ApiResponse("Internal server error"));
  }
});

let loginController = async (req, res) => {
  try {
    let { isExisting, token } = await loginService(req.body);

    return res
      .status(200)
      .json(new ApiResponse("User loggedin successfully", isExisting));
  } catch (error) {
    console.log(error);
    return res.status(500).json(new ApiResponse("Internal server error"));
  }
};

module.exports = {
  registerController,
  loginController,
};
