const express = require('express');
const bodyParser = require('body-parser');
const BlogController = require('./controllers/BlogController');
const UserController = require('./controllers/UserController');
const errorMiddlewares = require('./middlewares/errorMiddlewares');
const validCreateBlogs = require('./middlewares/validCreateBlogs');
const validEditBlogs = require('./middlewares/validEditBlogs');
const validUser = require('./middlewares/validUser');

const app = express();
app.use(bodyParser.json());

const PORT = 3000;

app.post('/users', validUser, UserController.create);

// Endpoint para criação de blogs
app.post('/blogs', validCreateBlogs, BlogController.create);

// Endpoint para visualizar todos os blogs criados
app.get('/blogs', BlogController.getAll);

// Endpoint para visualizar um único blog
app.get('/blogs/:slug', BlogController.findBySlug);

// Endpoint para editar um único blog
app.put('/blogs/:slug', validEditBlogs, BlogController.editBlog);

// Endpoint para deletar um único blog
app.delete('/blogs/:slug', BlogController.deleteBlog);

// Middlewares para capturar os erros
app.use(errorMiddlewares);

app.listen(PORT, () => {
  console.log(`Online na port: ${PORT}`);
});
