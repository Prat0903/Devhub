let express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
  createProjectController,
  getAllProjectsController,
  getProjectByIdController,
  updateProjectController,
} = require("../controllers/project.controller");

let router = express.Router();

router.post("/", authMiddleware, createProjectController);
router.get("/", authMiddleware, getAllProjectsController);
router.get("/:id", authMiddleware, getProjectByIdController);
router.patch("/:id", authMiddleware, updateProjectController);

module.exports = router;
