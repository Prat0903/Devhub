let express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
  updateUserProfileController,
  getMyUserProfileController,
} = require("../controllers/profile.controller");

let router = express.Router();

router.get("/", authMiddleware, getMyUserProfileController);
router.patch("/", authMiddleware, updateUserProfileController);

module.exports = router;
