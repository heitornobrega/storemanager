const { salesModel, productModel } = require('../models');

const getAll = async () => {
  const result = await salesModel.getAll();
  return { message: result };
};

const getById = async (id) => {
  const result = await salesModel.getById(id);
  if (result.length === 0) return { message: 'Sale not found' };
  return result;
};

const insert = async (sale) => {
  const productExist = await productModel.findProducts(sale);
  const productNotFound = productExist.some((element) => element.length === 0);
  if (productNotFound) return { message: 'Product not found' };
  const saleId = await salesModel.insert(sale);
  const allInfos = [...sale].map((element) => ({ saleId, ...element }));
  await salesModel.insertProduct(allInfos);
  const result = { id: saleId, itemsSold: sale };
  return result;
};
const deleteById = async (id) => {
  const result = await salesModel.deleteById(id);
  if (!result) return { message: 'Sale not found' };
  return result;
};

module.exports = { getAll, getById, insert, deleteById };