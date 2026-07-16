const UserModel = require("../models/user.model");
let bcrypt = require("bcrypt");
const generateToken = require("../utils/token");
const ApiError = require("../utils/apiError");

let registerService = async (data) => {
  let { name, email, password } = data;

  if (!name || !email || !password)
    throw new ApiError(400, "All fields are required");

  let isExist = await UserModel.findOne({ email });

  if (isExist) throw new ApiError(409, "User already registered");

  let hashedPassword = await bcrypt.hash(password, 10);

  let newUser = await UserModel.create({
    name,
    email,
    password: hashedPassword,
  });

  let token = generateToken(newUser._id);

  return {
    newUser,
    token,
  };
};

let loginService = async (data) => {
  let { email, password } = data;

  if (!email || !password) throw new ApiError(400, "All fields are required");

  let isExisting = await UserModel.findOne({ email });

  if (!isExisting) throw new ApiError(404, "User not found");

  let comparePassword = await bcrypt.compare(password, isExisting.password);

  if (!comparePassword) throw new ApiError(401, "Invalid credentials");

  let token = generateToken(isExisting._id);

  res.cookie("token", token);

  return {
    isExisting,
    token,
  };
};

module.exports = {
  registerService,
  loginService,
};
