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
const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await salesServices.deleteById(id);
  if (result.message) { return res.status(404).json({ message: 'Sale not found' }); }
  return res.status(204).send();
};

const update = async (req, res) => {
  const { id } = req.params;
  const sale = req.body;
  const result = await salesServices.update({ id, sale });
  if (result.message) { return res.status(404).json({ message: result.message }); }
  return res.status(200).json({ saleId: id, itemsUpdated: sale });
};

module.exports = { getAll, getById, insert, deleteById, update };
