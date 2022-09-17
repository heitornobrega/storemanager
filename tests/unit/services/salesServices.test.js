const { expect } = require("chai");
const sinon = require("sinon");
const { allSells, salesById } = require("./mock/sales.service.mock");
const { salesModel } = require("../../../src/models");
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
    // it("Testa a validação do id", async function () {
    //   sinon.stub(validationInputValues, "validateId").resolves({
    //     type: "ID_NOT_FOUND",
    //     message: "Product not found",
    //   });
    //   // sinon.stub(productModel, "getById").resolves([]);
    //   const result = await productsService.getById(45);
    //   expect(result).to.be.deep.equal({
    //     type: "ID_NOT_FOUND",
    //     message: "Product not found",
    //   });
    // });
    // it("Testa a validação do id", async function () {
    //   sinon.stub(productModel, "getAll").resolves([]);
    //   const result = await productsService.getAll();
    //   expect(result).to.be.deep.equal({
    //     type: null,
    //     message: [],
    //   });
    // });
  });
  // describe("Testes de unidade do endpoint POST /products", function () {
  //   describe("Testes de unidade função insert", function () {
  //     afterEach(function () {
  //       sinon.restore();
  //     });
  //     it("Testes de unidade insert", async function () {
  //       const name = "nomeDoProduto";
  //       const id = 45;
  //       const response = { name: name, id: id };
  //       sinon.stub(productModel, "insert").resolves(45);
  //       const result = await productsService.insert(name);
  //       expect(result).to.be.deep.equal(response);
  //     });
  //   });
  // });
});
