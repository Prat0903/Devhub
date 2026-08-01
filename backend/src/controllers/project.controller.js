const { default: mongoose } = require("mongoose");
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

let getAllProjectsController = asyncHandler(async (req, res) => {
  let user = req.user._id;

  let projects = await ProjectModel.find({ owner: user });

  return res.status(200).json(new ApiResponse("Projects fetched", projects));
});

let getProjectByIdController = asyncHandler(async (req, res) => {
  let id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id))
    throw new ApiError(404, "Invalid project ID");

  let project = await ProjectModel.findOne({
    _id: id,
    owner: req.user._id,
  });

  if (!project) throw new ApiError(404, "Project not found");

  return res.status(200).json(new ApiResponse("Project fetched", project));
});

let updateProjectController = asyncHandler(async (req, res) => {
  let id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id))
    throw new ApiError(404, "Invalid project ID");

  let { title, description, techStack, githubUrl, images } = req.body;

  if (!title && !description && !techStack && !githubUrl && !images) {
    throw new ApiError(
      400,
      "At least one field is required to update the project",
    );
  }

  let project = await ProjectModel.findOneAndUpdate(
    { _id: id, owner: req.user._id },
    { title, description, techStack, githubUrl, images },
    { new: true },
  );

  if (!project) throw new ApiError(404, "Project not found");

  return res
    .status(200)
    .json(new ApiResponse("Project updated successfully", project));
});

module.exports = {
  createProjectController,
  getAllProjectsController,
  getProjectByIdController,
  updateProjectController,
};
