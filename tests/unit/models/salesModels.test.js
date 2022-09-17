const { expect } = require("chai");
const sinon = require("sinon");
const { allSells, salesById } = require("./mocks/sales.model.mock");
const connection = require("../../../src/models/connection");
const { salesModel } = require("../../../src/models");

describe("Testes de unidade do model de sales", function () {
  describe("Testes de unidade", function () {
    afterEach(function () {
      sinon.restore();
    });
    it("Testa a listagem de todos os sales", async function () {
      sinon.stub(connection, "execute").resolves([allSells]);
      const result = await salesModel.getAll();
      expect(result).to.be.deep.equal(allSells);
    });
    it("Testa a listagem de um sales pelo id", async function () {
      sinon.stub(connection, "execute").resolves([salesById]);
      const result = await salesModel.getById(5000);
      expect(result).to.be.deep.equal(salesById);
    });
  });
});
