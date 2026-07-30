let express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
  createProjectController,
  getProjectController,
} = require("../controllers/project.controller");

let router = express.Router();

router.post("/", authMiddleware, createProjectController);
router.get("/", authMiddleware, getProjectController);

module.exports = router;
