const { UNAUTHORIZED } = require('../utils/httpCodes');

// Objeto de erro para usuários sem acesso de admin
const error = {
  code: 'unauthorized',
  message: 'Unauthorized user',
  status: UNAUTHORIZED,
};

const validLoginAdmin = (req, _res, next) => {
  const { admin } = req.body;

  if (!admin) {
    throw (error);
  }

  next();
};

module.exports = validLoginAdmin;
