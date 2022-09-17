const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const {
  allProducts,
  productById,
} = require("./mock/products.controllers.mock");
const { productsController } = require("../../../src/controllers");
const { productsService } = require("../../../src/services");
const { expect } = chai;
chai.use(sinonChai);

describe("Teste de unidade da camada products controllers", function () {
  describe("teste de unidade getAll", function () {
    afterEach(function () {
      sinon.restore();
    });
    it("Teste sucesso listagem completa", async function () {
      const res = {};
      const req = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, "getAll")
        .resolves({ type: null, message: allProducts });
      await productsController.getAll(req, res);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allProducts);
    });
    it("Teste fracasso listagem completa erro esperado", async function () {
      const res = {};
      const req = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, "getAll")
        .resolves({ type: "", message: allProducts });
      await productsController.getAll(req, res);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allProducts);
    });
    it("Teste fracasso listagem completa erro inesperado", async function () {
      const res = {};
      const req = {};
      const error = new Error({ message: "erro" });
      const next = sinon.stub().returns();
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, "getAll").throws(error);
      await productsController.getAll(req, res, next);
      expect(next).to.have.been.calledWith(error);
    });
  });

  describe("teste de unidade getById", function () {
    afterEach(function () {
      sinon.restore();
    });
    it("Teste sucesso getById", async function () {
      const res = {};
      const req = { params: { id: 3 } };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, "getById")
        .resolves({ type: null, message: productById });
      await productsController.getById(req, res);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productById);
    });
    it("Teste fracasso listagem pelo id", async function () {
      const res = {};
      const req = { params: { id: 3 } };
      const error = new Error({ message: "erro" });
      const next = sinon.stub().returns();
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, "getById").throws(error);
      await productsController.getById(req, res, next);
      expect(next).to.have.been.calledWith(error);
    });
    it("Testa a validação do id", async function () {
      const res = {};
      const req = { params: { id: 45 } };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, "getById")
        .resolves({ type: "ID_NOT_FOUND", message: "Product not found" });
      await productsController.getById(req, res);
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({
        message: "Product not found",
      });
    });
  });
  describe("Testes de unidade do endpoint POST /products", function () {
    describe("Testes de unidade função insert", function () {
      afterEach(function () {
        sinon.restore();
      });
      it("Testes de unidade insert", async function () {
        const res = {};
        const req = { body: { name: "nomeDoProduto" } };
        res.json = sinon.stub().returns();
        res.status = sinon.stub().returns(res);
        const { name } = req.body;
        const id = 45;
        const response = { name: name, id: id };
        sinon.stub(productsService, "insert").resolves({ name: name, id: id });
        await productsController.insert(req, res);
        expect(res.status).to.have.been.calledWith(201);
        expect(res.json).to.have.been.calledWith(response);
      });
    });
  });
});
