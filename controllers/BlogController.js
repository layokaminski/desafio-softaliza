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

module.exports = {
  create,
  getAll,
};
