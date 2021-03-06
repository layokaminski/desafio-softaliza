const BlogModel = require('../models/BlogModel');

const { NOT_FOUND } = require('../utils/httpCodes');

// Objeto de erro para slugs não encontrados
const error = {
  code: 'invalid_data',
  message: 'Wrong slug format',
  status: NOT_FOUND,
};

const create = async ({ title, content, slug, createdBy }) => {
  const createdBlog = await BlogModel.create({ title, content, slug, createdBy });

  return createdBlog;
};

const getAll = async () => {
  const getAllBlogs = await BlogModel.getAll();

  return getAllBlogs;
};

const findBySlug = async (slug) => {
  const findBlogBySlug = await BlogModel.findBySlug(slug);

  if (!findBlogBySlug) {
    throw (error);
  }

  return findBlogBySlug;
};

const editBlog = async (slug, { title, content, editedBy }) => {
  const editedBlog = await BlogModel.editBlog(slug, { title, content, editedBy });

  return editedBlog;
};

const deleteBlog = async (slug) => {
  const deletedBlog = await BlogModel.deleteBlog(slug);

  return deletedBlog;
};

module.exports = {
  create,
  getAll,
  findBySlug,
  editBlog,
  deleteBlog,
};
