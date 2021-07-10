const connection = require('./connection');

const create = async ({ title, content, slug, createdBy }) => {
  const connect = await connection();
  const createBlog = await connect.collection('blogposts')
    .insertOne({ title, content, slug, createdBy });

  return {
    _id: createBlog.insertedId,
    message: `Blog ${title} criado com sucesso0`,
  };
};

module.exports = {
  create,
};
