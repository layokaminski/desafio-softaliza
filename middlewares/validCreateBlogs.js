const Joi = require('joi');

const validCreateBlogs = (req, _res, next) => {
  const { error } = Joi.object({
    title: Joi.string().not().empty().required(),
    content: Joi.string().not().empty().required(),
    slug: Joi.string().not().empty().required(),
    created_by: Joi.string().not().empty().required(),
  }).validate(req.body);

  if (error) return next(error);

  next();
};

module.exports = validCreateBlogs;
