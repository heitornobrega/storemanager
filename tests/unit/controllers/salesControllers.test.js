const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const {salesById, allSells} = require("./mock/sales.controllers.mock");
const { productsController,salesController } = require("../../../src/controllers");
const { productsService,salesServices } = require("../../../src/services");
const { expect } = chai;
chai.use(sinonChai);

describe("Teste de unidade da camada sales controllers", function () {
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
        .stub(salesServices, "getAll")
        .resolves({ type: null, message: allSells });
      await salesController.getAll(req, res);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allSells);
    });
    it("Teste fracasso listagem completa erro esperado", async function () {
      const res = {};
      const req = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesServices, "getAll")
        .resolves({ type: "", message: allSells });
      await salesController.getAll(req, res);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allSells);
    });
    // it("Teste fracasso listagem completa erro inesperado", async function () {
    //   const res = {};
    //   const req = {};
    //   const error = new Error({ message: "erro" });
    //   const next = sinon.stub().returns();
    //   res.status = sinon.stub().returns(res);
    //   res.json = sinon.stub().returns();
    //   sinon.stub(productsService, "getAll").throws(error);
    //   await productsController.getAll(req, res, next);
    //   expect(next).to.have.been.calledWith(error);
    // });
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
      sinon.stub(salesServices, "getById").resolves(salesById);
      await salesController.getById(req, res);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(salesById);
    });
    it("Teste fracasso listagem pelo id", async function () {
      const res = {};
      const req = { params: { id: 500 } };
      const error = { message: "Sale not found" };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      await salesController.getById(req, res);
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith(error);
    });
  //   it("Testa a validação do id", async function () {
  //     const res = {};
  //     const req = { params: { id: 45 } };
  //     res.status = sinon.stub().returns(res);
  //     res.json = sinon.stub().returns();
  //     sinon
  //       .stub(productsService, "getById")
  //       .resolves({ type: "ID_NOT_FOUND", message: "Product not found" });
  //     await productsController.getById(req, res);
  //     expect(res.status).to.have.been.calledWith(404);
  //     expect(res.json).to.have.been.calledWith({
  //       message: "Product not found",
  //     });
    // });
  });
  describe("Testes de unidade do endpoint POST /sales", function () {
    describe("Testes de unidade função insert", function () {
      afterEach(function () {
        sinon.restore();
      });
      it("Testes de unidade insert", async function () {
        const res = {};
        const req = {
          body: [
            {
              productId: 1,
              quantity: 1,
            },
            {
              productId: 2,
              quantity: 5,
            },
          ],
        };
        res.json = sinon.stub().returns();
        res.status = sinon.stub().returns(res);
        const id = 45;
        const response = {
          id: 3,
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
        };
        sinon.stub(salesServices, "insert").resolves({
          id: 3,
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
        await salesController.insert(req, res);
        expect(res.status).to.have.been.calledWith(201);
        expect(res.json).to.have.been.calledWith(response);
      });
      it('Teste de unidade fracasso insert, venda não encontrada', async function () {
                const res = {};
                const req = {
                  body: [
                    {
                      productId: 1000,
                      quantity: 1,
                    },
                    {
                      productId: 2000,
                      quantity: 5,
                    },
                  ],
                };
                res.json = sinon.stub().returns();
                res.status = sinon.stub().returns(res);
                const id = 45;
                const response = { message: "Product not found" };
                sinon
                  .stub(salesServices, "insert")
                  .resolves({ message: "Product not found" });
                await salesController.insert(req, res);
                expect(res.status).to.have.been.calledWith(404);
                expect(res.json).to.have.been.calledWith(response);
      })
    });
  });
});
