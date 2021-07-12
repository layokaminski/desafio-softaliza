const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const BlogModel = require('../models/BlogModel');

const editedPayloadBlog = {
  title: 'Example edit',
  content: 'Test edit',
  edited_by: 'Edited Test',
};

const payloadBlog = {
  title: 'Example',
  slug: 'Example test',
  created_by: 'Created Test',
  content: 'Test',
};

describe('Cobertura de testes para camada model', () => {
  before(async () => {
    const DBServer = new MongoMemoryServer();
    const URLMock = await DBServer.getUri();

    const connectionMock = await MongoClient
      .connect(URLMock, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  // Restauraremos a função `connect` original após os testes.
  after(() => {
    MongoClient.connect.restore();
  });

  describe('quando é inserido um novo blog com sucesso', () => {
    it('retorna um objeto', async () => {
      const response = await BlogModel.create(payloadBlog);

      expect(response).to.be.a('object');
    });

    it('tal objeto possui o "_id" do novo blog inserido', async () => {
      const response = await BlogModel.create(payloadBlog);

      expect(response).to.have.a.property('_id');
    });
  });

  describe('quando a requisição pede todos os blogs', () => {
    it('retorna um array com os blogs dentro de um objeto', async () => {
      const response = await BlogModel.getAll(payloadBlog);

      expect(response).to.be.a('object');
      expect(response).to.have.a.property('blogposts');
    });
  });

  describe('quando a requisição pede um único blog', () => {
    it('retorna um objeto com o mesmo slug que foi usado como parâmetro', async () => {
      const response = await BlogModel.findBySlug(payloadBlog.slug);

      expect(response.slug).to.be.equal(payloadBlog.slug);
    });
  });

  describe('quando a requisição edita as informações do blog', () => {
    it('Deve retonar um objeto com duas keys, uma é "slug", outra é uma "message"', async () => {
      const response = await BlogModel.editBlog(payloadBlog.slug, editedPayloadBlog);

      expect(response).to.be.an('object').to.have.all.keys('slug', 'message');
    });
  });

  describe('quando a requisição deleta o blog', () => {
    it('Deve retonar o blog deletado  ', async () => {
      const response = await BlogModel.deleteBlog(payloadBlog.slug);

      expect(response).to.be.an('object');
    });
  });
});
