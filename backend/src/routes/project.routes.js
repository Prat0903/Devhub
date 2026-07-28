let express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const { createProjectController } = require("../controllers/project.controller");

let router = express.Router();

router.post("/", authMiddleware, createProjectController);

module.exports = router;
