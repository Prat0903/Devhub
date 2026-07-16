let jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

let authMiddleware = async (req, res, next) => {
  try {
    let token = req.cookies.token;

    if (!token)
      return res.status(401).json({
        message: "Unauthorized user",
      });

    let decoded = await jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded)
      return res.status(401).json({
        message: "Unauthorized user",
      });

    let user = await UserModel.findById(decoded.id);
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
