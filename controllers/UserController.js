const {
  CREATED,
} = require('../utils/httpCodes');
const UserService = require('../services/UserService');

const create = async (req, res, next) => {
  try {
    const { email, password, admin } = req.body;

    const createdUser = await UserService.create({ email, password, admin });

    res.status(CREATED).json(createdUser);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
};
