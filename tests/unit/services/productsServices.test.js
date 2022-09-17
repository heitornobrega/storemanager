const { expect } = require("chai");
const sinon = require("sinon");
const { allProducts, productById } = require("./mock/products.service.mock");
const { productModel } = require("../../../src/models");
const { productsService } = require("../../../src/services");
const validationInputValues = require("../../../src/middlewares/validations/validationInputValues");


describe("Testes de unidade para a cada service", function () {
  describe("Testes de unidade", function () {
    afterEach(function () {
      sinon.restore();
    });
    it("Teste para a função getAll", async function () {
      sinon.stub(productModel, "getAll").resolves(allProducts);
      const result = await productsService.getAll();
      expect(result).to.be.deep.equal({ message: allProducts });
    });
    it("Teste para a função getById", async function () {
      sinon.stub(productModel, "getById").resolves([productById]);
      const result = await productsService.getById(3);
      expect(result).to.be.deep.equal({ type: null, message: productById });
    });
    it("Testa a validação do id", async function () {
      sinon.stub(validationInputValues, "validateId").resolves({
        type: "ID_NOT_FOUND",
        message: "Product not found",
      });
      // sinon.stub(productModel, "getById").resolves([]);
      const result = await productsService.getById(45);
      expect(result).to.be.deep.equal({
        type: "ID_NOT_FOUND",
        message: "Product not found",
      });
    });
    // it("Testa a validação do id", async function () {
    //   sinon.stub(productModel, "getAll").resolves([]);
    //   const result = await productsService.getAll();
    //   expect(result).to.be.deep.equal({
    //     type: null,
    //     message: [],
    //   });
    // });
  });
});
