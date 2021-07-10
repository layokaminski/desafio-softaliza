const BlogModel = require('../models/BlogModel');

const create = async ({ title, content, slug, createdBy }) => {
  const createdBlog = await BlogModel.create({ title, content, slug, createdBy });

  return createdBlog;
};

module.exports = {
  create,
};
