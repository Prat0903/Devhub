const { default: mongoose } = require("mongoose");
const BlogModel = require("../models/blog.model");
const {
  createBlogService,
  updateBlogService,
} = require("../services/blog.service");
const ApiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/apiError");

let createBlogController = asyncHandler(async (req, res) => {
  let newBlog = await createBlogService(req.body, req.user._id);

  return res
    .status(201)
    .json(new ApiResponse("Blog created successfully", { blog: newBlog }));
});

let getMyBlogsController = asyncHandler(async (req, res) => {
  let user = req.user._id;

  let blogs = await BlogModel.find({ author: user }).populate(
    "author",
    "name title",
  );

  return res.status(200).json(new ApiResponse("Blogs fetched", blogs));
});

let getMyBlogByIdController = asyncHandler(async (req, res) => {
  let id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id))
    throw new ApiError(404, "Invalid blog ID");

  let blog = await BlogModel.findOne({
    _id: id,
    author: req.user._id,
  }).populate("author", "name title");

  if (!blog) throw new ApiError(404, "Blog not found");

  return res.status(200).json(new ApiResponse("Blog fetched", blog));
});

let updateBlogController = asyncHandler(async (req, res) => {
  let id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id))
    throw new ApiError(404, "Invalid blog ID");

  let blog = await updateBlogService(id, req.body, req.user._id);

  return res
    .status(200)
    .json(new ApiResponse("Blog updated successfully", blog));
});

let deleteBlogController = asyncHandler(async (req, res) => {
  let id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id))
    throw new ApiError(404, "Invalid blog ID");

  let blog = await BlogModel.findOneAndDelete({
    _id: id,
    author: req.user._id,
  });

  if (!blog) throw new ApiError(404, "Blog not found");

  return res.status(200).json(new ApiResponse("Blog deleted", blog));
});

let getAllBlogsController = asyncHandler(async (req, res) => {
  let blogs = await BlogModel.find({ published: true }).populate(
    "author",
    "name title",
  );

  return res.status(200).json(new ApiResponse("All blogs fetched", blogs));
});

let getBlogByIdController = asyncHandler(async (req, res) => {
  let { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    throw new ApiError(404, "Invalid blog ID");

  let blog = await BlogModel.findOne({ _id: id, published: true }).populate(
    "author",
    "name title",
  );

  if (!blog) throw new ApiError(404, "Blog not found");

  return res.status(200).json(new ApiResponse("Blog fetched", blog));
});

module.exports = {
  createBlogController,
  getMyBlogsController,
  getMyBlogByIdController,
  updateBlogController,
  deleteBlogController,
  getAllBlogsController,
  getBlogByIdController,
};
