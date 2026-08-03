let express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const { createBlogController } = require("../controllers/blog.controller");

let router = express.Router();

router.post("/", authMiddleware, createBlogController);

module.exports = router;
