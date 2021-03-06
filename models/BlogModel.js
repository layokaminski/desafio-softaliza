const connection = require('./connection');

const create = async ({ title, content, slug, createdBy }) => {
  const connect = await connection();
  const createdBlog = await connect.collection('blogposts')
    .insertOne({ title, content, slug, createdBy });

  return {
    _id: createdBlog.insertedId,
    message: `Blog ${title} criado com sucesso`,
  };
};

const getAll = async () => {
  const connect = await connection();
  const getAllBlogs = await connect.collection('blogposts').find().toArray();

  return {
    blogposts: [...getAllBlogs],
  };
};

const findBySlug = async (slug) => {
  const connect = await connection();
  const findBlogBySlug = await connect.collection('blogposts')
    .findOne({ slug });

  return findBlogBySlug;
};

const editBlog = async (slug, { title, content, editedBy }) => {
  const connect = await connection();
  const editedBlog = await connect.collection('blogposts')
    .updateOne({ slug }, { $set: { title, content, editedBy } });

  if (editedBlog.modifiedCount < 1) {
    return false;
  }

  return {
    slug,
    message: `${editedBy} editou o blog ${title} com sucesso`,
  };
};

const deleteBlog = async (slug) => {
  const connect = await connection();
  const deletedBlog = await connect.collection('blogposts')
    .findOneAndDelete({ slug });
  
  return deletedBlog.value;
};

module.exports = {
  create,
  getAll,
  findBySlug,
  editBlog,
  deleteBlog,
};
