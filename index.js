const express = require('express');
const bodyParser = require('body-parser');
const BlogController = require('./controllers/BlogController');
const errorMiddlewares = require('./middlewares/errorMiddlewares');
const validCreateBlogs = require('./middlewares/validCreateBlogs');
const validEditBlogs = require('./middlewares/validEditBlogs');

const app = express();
app.use(bodyParser.json());

const PORT = 3000;

app.post('/blogs', validCreateBlogs, BlogController.create);
app.get('/blogs', BlogController.getAll);
app.get('/blogs/:slug', BlogController.findBySlug);
app.put('/blogs/:slug', validEditBlogs, BlogController.editBlog);
app.delete('/blogs/:slug', BlogController.deleteBlog);

app.use(errorMiddlewares);

app.listen(PORT, () => {
  console.log(`Online na port: ${PORT}`);
});
