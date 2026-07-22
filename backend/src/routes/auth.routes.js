let express = require("express");
const {
  registerController,
  loginController,
  logoutController,
  getCurrentUserController,
} = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");

let router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/logout", logoutController);
router.get("/me", authMiddleware, getCurrentUserController);

module.exports = router;
