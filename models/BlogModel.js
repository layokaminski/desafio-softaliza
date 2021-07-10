const connection = require('./connection');

const create = async ({ title, content, slug, createdBy }) => {
  const connect = await connection();
  const createdBlog = await connect.collection('blogposts')
    .insertOne({ title, content, slug, createdBy });

  return {
    _id: createdBlog.insertedId,
    message: `Blog ${title} criado com sucesso0`,
  };
};

module.exports = {
  create,
};
