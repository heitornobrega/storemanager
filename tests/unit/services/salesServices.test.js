const { expect } = require("chai");
const sinon = require("sinon");
const { allSells, salesById } = require("./mock/sales.service.mock");
const { salesModel, productModel } = require("../../../src/models");
const { salesServices } = require("../../../src/services");

describe("Testes de unidade para a cada service", function () {
  describe("Testes de unidade", function () {
    afterEach(function () {
      sinon.restore();
    });
    it("Teste para a função getAll", async function () {
      sinon.stub(salesModel, "getAll").resolves(allSells);
      const result = await salesServices.getAll();
      expect(result).to.be.deep.equal({ message: allSells });
    });
    it("Teste para a função getById", async function () {
      sinon.stub(salesModel, "getById").resolves([salesById]);
      const result = await salesServices.getById(3);
      expect(result).to.be.deep.equal([salesById]);
    });
  });
  it('Testa a função insert', async function () {
    sinon.stub(productModel, 'findProducts').resolves([['someContent']]);
    sinon.stub(salesModel, 'insert').resolves(2);
    const result = await salesServices.insert([
      {
        "productId": 1,
        "quantity": 1
      },
      {
        "productId": 2,
        "quantity": 5
      }
    ])
    expect(result).to.be.deep.equal({
      id: 2,
      itemsSold: [
        {
          productId: 1,
          quantity: 1,
        },
        {
          productId: 2,
          quantity: 5,
        },
      ],
    });
  })
});
