const UserModel = require('../models/UserModel');

const create = async ({ email, password, admin }) => {
  if (admin) {
    const createdUserAdmin = await UserModel.createUserAdmin({ email, password, admin });

    return createdUserAdmin;
  }

  const createdUser = await UserModel.createUser({ email, password });

  return createdUser;
};

module.exports = {
  create,
};
