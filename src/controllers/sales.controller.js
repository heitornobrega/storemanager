const { salesServices } = require('../services');

const getAll = async (_req, res) => {
  const { message } = await salesServices.getAll();
  res.status(200).json(message);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await salesServices.getById(id);
  if (result.message) return res.status(404).json(result);
  res.status(200).json(result);
};

const insert = async (req, res) => {
  const sale = req.body;
  const result = await salesServices.insert(sale);
  if (result.message) return res.status(404).json(result);
  res.status(201).json(result);
};
module.exports = { getAll, getById, insert };
