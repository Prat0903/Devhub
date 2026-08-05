let express = require("express");
const {
  getAllUserController,
  getUserByIdController,
} = require("../controllers/user.controller");

let router = express.Router();

router.get("/", getAllUserController);
router.get("/:id", getUserByIdController);

module.exports = router;
