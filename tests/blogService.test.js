const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const BlogService = require('../services/BlogService');

describe('Cobertura de testes para camada service', () => {
  const payloadBlog = {
    title: 'Example',
    slug: 'Example test',
    created_by: 'Created Test',
    content: 'Test',
  };

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
      const response = await BlogService.create(payloadBlog);

      expect(response).to.be.a('object');
    });

    it('tal objeto possui o "message" do novo blog inserido', async () => {
      const response = await BlogService.create(payloadBlog);

      expect(response).to.have.a.property('message');
    });
  });

  describe('quando a requisição pede todos os blogs', () => {
    it('retorna um array com os blogs dentro de um objeto', async () => {
      const response = await BlogService.getAll();

      expect(response).to.be.a('object');
      expect(response).to.have.a.property('blogposts');
    });
  });
});