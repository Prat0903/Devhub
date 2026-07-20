let express = require("express");
const {
  registerController,
  loginController,
  logoutController,
} = require("../controllers/auth.controller");

let router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/logout", logoutController);

module.exports = router;
