let jwt = require("jsonwebtoken");

let generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "15m" });
};

module.exports = generateToken;
