const { expect } = require("chai");
const sinon = require("sinon");
const {allProducts, productById} = require('./mocks/products.model.mock')
const connection = require("../../../src/models/connection");
const {productModel} = require("../../../src/models");


describe('Testes de unidade do model de produtos', function () {
  describe('Testes de unidade', function () {
    afterEach(function () {
      sinon.restore();
    })
    it('Testa a listagem de todos os produtos', async function () {
      sinon.stub(connection, "execute").resolves([allProducts]);
      const result = await productModel.getAll();
      expect(result).to.be.deep.equal(allProducts);

    })
    it('Testa a listagem de um produto pelo id', async function () {
      sinon.stub(connection, "execute").resolves([productById]);
      const result = await productModel.getById(5000);
      expect(result).to.be.deep.equal(productById);

    })
  })
})
