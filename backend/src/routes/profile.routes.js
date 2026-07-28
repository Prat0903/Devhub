let express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const updateUserProfileController = require("../controllers/profile.controller");

let router = express.Router();

router.patch("/profile", authMiddleware, updateUserProfileController);

module.exports = router;
