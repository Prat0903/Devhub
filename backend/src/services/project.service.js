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

module.exports = { createProjectService };
