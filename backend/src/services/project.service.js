let createProjectService = async (
  { title, description, techStack, githubUrl, images },
  user,
) => {
  if (!title || !description || !techStack)
    throw new ApiError(400, "Title, Descrption and TechStack are required");

  if (title.trim().length < 3)
    throw new ApiError(400, "Title should have atleast 3 characters");

  if (description.trim().length < 15)
    throw new ApiError(400, "Description should have atleast 15 characters");

  if (!Array.isArray(techStack) || techStack.length < 1)
    throw new ApiError(400, "Should have atleast 1 tag");

  let githubUrlRegex =
    /^https:\/\/github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+\/?$/;
  if (!githubUrlRegex.test(githubUrl))
    throw new ApiError(400, "Invalid url format");

  if (!Array.isArray(images) || images.length < 1)
    throw new ApiError(400, "Should have atleast 1 image");

  let newProject = await ProjectModel.create({
    title,
    description,
    techStack,
    githubUrl,
    images,
    owner: user,
  });

  return newProject;
};

let updateProjectService = async (
  id,
  { title, description, techStack, githubUrl, images },
  user,
) => {
  if (!title && !description && !techStack && !githubUrl && !images) {
    throw new ApiError(
      400,
      "At least one field is required to update the project",
    );
  }
  let updatedFields = {};

  if (title !== undefined) {
    if (title.trim().length < 3)
      throw new ApiError(400, "Title should be atleast 3 characters long");
    updatedFields.title = title;
  }
  if (description !== undefined) {
    if (description.trim().length < 15)
      throw new ApiError(
        400,
        "Description should be atleast 15 characters long",
      );
    updatedFields.description = description;
  }
  if (techStack !== undefined) {
    if (!Array.isArray(techStack) || techStack.length < 1)
      throw new ApiError(400, "Should have atleast 1 tag");
    updatedFields.techStack = techStack;
  }
  if (githubUrl !== undefined) {
    let githubUrlRegex =
      /^https:\/\/github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+\/?$/;
    if (!githubUrlRegex.test(githubUrl))
      throw new ApiError(400, "Invalid GitHub URL");
    updatedFields.githubUrl = githubUrl;
  }
  if (images !== undefined) {
    if (!Array.isArray(images) || images.length < 1)
      throw new ApiError(400, "Should have atleast 1 image");
    updatedFields.images = images;
  }

  let project = await ProjectModel.findOneAndUpdate(
    { _id: id, owner: user },
    updatedFields,
    { new: true, runValidators: true },
  );

  if (!project) throw new ApiError(404, "Project not found");

  return project;
};

module.exports = { createProjectService, updateProjectService };
