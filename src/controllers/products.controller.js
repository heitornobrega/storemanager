const { productsService } = require('../services');
const errorMap = require('../utils/errorMap');

const getAll = async (_req, res, next) => {
  try {
    const { message } = await productsService.getAll();
    // if (type) return res.status(errorMap.mapError(type)).json(message);
    res.status(200).json(message);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
      const { id } = req.params;
      const { type, message } = await productsService.getById(id);
      if (type) { return res.status(errorMap.mapError(type)).json({ message }); }
      res.status(200).json(message);
  } catch (error) {
    next(error);
  }
};

const insert = async (req, res) => {
  // try {
    const { name } = req.body;
    const result = await productsService.insert(name);
    res.status(201).json(result);
  // } catch (error) {
  //   next(error);
  // }
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await productsService.deleteById(id);
  if (result.message) return res.status(404).json({ message: 'Product not found' });
  return res.status(204).send();
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const result = await productsService.update({ id, name });
  if (result.message) return res.status(404).json({ message: 'Product not found' });
  return res.status(200).json({ id, name });
};

const getByName = async (req, res) => {
  const { q } = req.query;
  const result = await productsService.getByName(q);
  if (result.message) { return res.status(404).json({ message: 'Product not found' }); }
  return res.status(200).json(result);
};

module.exports = { getAll, getById, insert, deleteById, update, getByName };
