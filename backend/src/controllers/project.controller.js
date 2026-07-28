const ProjectModel = require("../models/project.model");
const { createProjectService } = require("../services/project.service");
const ApiError = require("../utils/apiError");
const ApiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");

let createProjectController = asyncHandler(async (req, res) => {
  let newProject = await createProjectService(req.body, req.user._id);

  return res
    .status(201)
    .json(
      new ApiResponse("Project added successfully", { project: newProject }),
    );
});

module.exports = { createProjectController };
