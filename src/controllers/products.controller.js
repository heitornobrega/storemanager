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

const insert = async (req, res, next) => {
  try {
    const { name } = req.body;
    console.log(name);
    const result = await productsService.insert(name);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAll, getById, insert };
