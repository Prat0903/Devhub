let express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
  createBlogController,
  getAllBlogsController,
  getBlogByIdController,
  updateBlogController,
  deleteBlogController,
} = require("../controllers/blog.controller");

let router = express.Router();

router.post("/", authMiddleware, createBlogController);
router.get("/", authMiddleware, getAllBlogsController);
router.get("/:id", authMiddleware, getBlogByIdController);
router.patch("/:id", authMiddleware, updateBlogController);
router.delete("/:id", authMiddleware, deleteBlogController);

module.exports = router;
