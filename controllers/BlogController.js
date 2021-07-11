const {
  SUCCESS,
  CREATED,
} = require('../utils/httpCodes');
const BlogService = require('../services/BlogService');

const create = async (req, res, next) => {
  try {
    const { title, content, slug, created_by: createdBy } = req.body;
    
    const createdBlog = await BlogService.create({ title, content, slug, createdBy });

    return res.status(CREATED).json(createdBlog);
  } catch (error) {
    next(error);
  }
};

const getAll = async (_req, res, next) => {
  try {
    const getAllBlogs = await BlogService.getAll();

    return res.status(SUCCESS).json(getAllBlogs);
  } catch (error) {
    next(error);
  }
};

const findBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const findBlogBySlug = await BlogService.findBySlug(slug);

    return res.status(SUCCESS).json(findBlogBySlug);
  } catch (error) {
    next(error);
  }
};

const editBlog = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const { title, content, edited_by: editedBy } = req.body;

    await BlogService.findBySlug(slug);

    const editedBlog = await BlogService.editBlog(slug, { title, content, editedBy });

    return res.status(SUCCESS).json(editedBlog);
  } catch (error) {
    next(error);
  }
};

const deleteBlog = async (req, res, next) => {
  try {
    const { slug } = req.params;
    await BlogService.findBySlug(slug);

    const deletedBlog = await BlogService.deleteBlog(slug);

    return res.status(SUCCESS).json(deletedBlog);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  getAll,
  findBySlug,
  editBlog,
  deleteBlog,
};
