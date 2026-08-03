const BlogModel = require("../models/blog.model");
const { createBlogService } = require("../services/blog.service");
const ApiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");

let createBlogController = asyncHandler(async (req, res) => {
  let newBlog = await createBlogService(req.body, req.user._id);

  return res
    .status(201)
    .json(new ApiResponse("Blog created successfully", { blog: newBlog }));
});

module.exports = { createBlogController };
