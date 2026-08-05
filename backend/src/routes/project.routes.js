let express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
  createProjectController,
  getMyProjectsController,
  getMyProjectByIdController,
  updateProjectController,
  deleteProjectController,
  getAllProjectsController,
  getProjectByIdController,
} = require("../controllers/project.controller");

let router = express.Router();

//protected routes
router.post("/", authMiddleware, createProjectController);
router.get("/me", authMiddleware, getMyProjectsController);
router.get("/me/:id", authMiddleware, getMyProjectByIdController);
router.patch("/:id", authMiddleware, updateProjectController);
router.delete("/:id", authMiddleware, deleteProjectController);

//public routes
router.get("/", getAllProjectsController);
router.get("/:id", getProjectByIdController);

module.exports = router;
