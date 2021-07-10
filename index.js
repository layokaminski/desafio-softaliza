const express = require('express');
const bodyParser = require('body-parser');
const BlogController = require('./controllers/BlogController');
const errorMiddlewares = require('./middlewares/errorMiddlewares');
const validMiddlewares = require('./middlewares/validBlogs');

const app = express();
app.use(bodyParser.json());

const PORT = 3000;

app.post('/blogs', validMiddlewares, BlogController.create);

app.use('blogs', errorMiddlewares);

app.listen(PORT, () => {
  console.log(`Online na port: ${PORT}`);
});
