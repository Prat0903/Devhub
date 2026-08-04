let createBlogService = async (
  { title, content, tags, coverImage },
  authorId,
) => {
  if (!title || !content || !tags) {
    throw new ApiError(400, "Title, content and tags are required");
  }
  if (title.trim().length < 4) {
    throw new ApiError(400, "Title should be atleast 4 characters long");
  }
  if (content.trim().length < 50) {
    throw new ApiError(400, "Content should be atleast 50 characters long");
  }
  if (!Array.isArray(tags) || tags.length < 1) {
    throw new ApiError(400, "Should have atleast 1 tag");
  }
  if (coverImage && typeof coverImage !== "string") {
    throw new ApiError(400, "Cover image should be a string");
  }

  let newBlog = await BlogModel.create({
    title,
    content,
    tags,
    author: authorId,
    coverImage,
  });

  return newBlog;
};

let updateBlogService = async (
  id,
  { title, content, tags, coverImage },
  authorId,
) => {
  if (!title && !content && !tags && !coverImage)
    throw new ApiError(
      400,
      "At least one field is required to update the blog",
    );

  let updatedFields = {};

  if (title !== undefined) {
    if (title.trim().length < 4)
      throw new ApiError(400, "Title should be atleast 4 characters long");
    updatedFields.title = title;
  }

  if (content !== undefined) {
    if (content.trim().length < 50)
      throw new ApiError(400, "Content should be atleast 50 characters long");
    updatedFields.content = content;
  }

  if (tags !== undefined) {
    if (!Array.isArray(tags) || tags.length < 1)
      throw new ApiError(400, "Should have atleast 1 tag");
    updatedFields.tags = tags;
  }

  if (coverImage !== undefined) {
    updatedFields.coverImage = coverImage;
  }

  let blog = await BlogModel.findOneAndUpdate(
    { _id: id, author: authorId },
    updatedFields,
    { new: true, runValidators: true },
  );

  return blog;
};

module.exports = { createBlogService, updateBlogService };
