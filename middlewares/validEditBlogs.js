const Joi = require('joi');

const validEditBlogs = (req, _res, next) => {
  const { error } = Joi.object({
    title: Joi.string().not().empty().required(),
    content: Joi.string().not().empty().required(),
    edited_by: Joi.string().not().empty().required(),
  }).validate(req.body);

  if (error) return next(error);

  next();
};

module.exports = validEditBlogs;