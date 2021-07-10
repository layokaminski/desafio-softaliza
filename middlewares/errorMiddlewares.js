const {
  UNPROCESSABLE_ENTITY,
  INTERNAL_SERVER_ERROR,
} = require('../utils/httpCodes');

const errorMiddlewares = (err, _req, res, _next) => {
  console.log(err);
  
  if (err.isJoi) {
    return res.status(UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: err.details[0].message,
      },
    });
  }

  res.status(INTERNAL_SERVER_ERROR).json({
    code: 'internal',
    message: 'Internal server error',
  });
};

module.exports = errorMiddlewares;
