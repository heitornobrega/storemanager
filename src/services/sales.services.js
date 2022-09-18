const { salesModel } = require('../models');

const getAll = async () => {
  const result = await salesModel.getAll();
  return { message: result };
};

const getById = async (id) => {
  const result = await salesModel.getById(id);
  if (result.length === 0) return { message: 'Sale not found' };
  return result;
};

module.exports = { getAll, getById };