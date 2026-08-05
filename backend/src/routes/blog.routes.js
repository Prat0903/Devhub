let express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
  createBlogController,
  getMyBlogsController,
  getMyBlogByIdController,
  updateBlogController,
  deleteBlogController,
  getAllBlogsController,
  getBlogByIdController,
} = require("../controllers/blog.controller");

let router = express.Router();

//protected routes
router.post("/", authMiddleware, createBlogController);
router.get("/me", authMiddleware, getMyBlogsController);
router.get("/me/:id", authMiddleware, getMyBlogByIdController);
router.patch("/:id", authMiddleware, updateBlogController);
router.delete("/:id", authMiddleware, deleteBlogController);

//public routes
router.get("/", getAllBlogsController);
router.get("/:id", getBlogByIdController);

module.exports = router;
