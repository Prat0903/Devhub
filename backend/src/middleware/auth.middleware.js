let jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

let authMiddleware = async (req, res, next) => {
  try {
    let token = req.cookies.token;

    if (!token)
      return res.status(401).json({
        message: "Unauthorized user",
      });

    let decoded = jwt.verify(token, process.env.JWT_SECRET);

    let user = await UserModel.findById(decoded.id);

    if (!user)
      return res.status(404).json({
        message: "User not found",
      });

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error in middleware",
    });
  }
};

module.exports = authMiddleware;
