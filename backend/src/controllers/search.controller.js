const BlogModel = require("../models/blog.model");
const ProjectModel = require("../models/project.model");
const UserModel = require("../models/user.model");
const { searchService } = require("../services/search.service");
const ApiError = require("../utils/apiError");
const ApiResponse = require("../utils/apiResponse");

let searchController = asyncHandler(async (req, res) => {
  let { q } = req.query;

  if (!q) throw new ApiError(400, "Query parameter 'q' is required");

  let { projects, users, blogs } = await searchService(q);

  return res
    .status(200)
    .json(new ApiResponse(200, "Search results", { projects, users, blogs }));
});

module.exports = { searchController };
