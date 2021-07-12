const connection = require('./connection');

const createUserAdmin = async ({ email, password, admin }) => {
  const connect = await connection();

  const createdUserAdmin = await connect.collection('users')
    .insertOne({ email, password, admin });

  return {
    _id: createdUserAdmin.insertedId,
    message: 'Administrador cadastrado com sucesso',
  };
};

const createUser = async ({ email, password }) => {
  const connect = await connection();

  const createdUser = await connect.collection('users')
    .insertOne({ email, password });

  return {
    _id: createdUser.insertedId,
    message: 'Usuário cadastrado com sucesso',
  };
};

module.exports = {
  createUserAdmin,
  createUser,
};
