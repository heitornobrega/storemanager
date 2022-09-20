const { productModel } = require('../models');
const validate = require('../middlewares/validations/validationInputValues');

const getAll = async () => {
  // try {
    const result = await productModel.getAll();
    // if (!result) return { type: 'Não encontrado', message: result }; 
    return { message: result };
  // } catch (error) {
  //   return { type: 'ERRO', message: error.message };
  // }
};

const getById = async (id) => {
  // try {
    const validationResult = await validate.validateId(id);
    if (validationResult.type) {
      return validationResult;
    }
    const [result] = await productModel.getById(id); 
    return { type: null, message: result };
  // } catch (error) {
  //   return { type: 'ERRO', message: error.message };
  // }
};

const insert = async (name) => {
  const result = await productModel.insert(name);
  return { id: result, name };
};

const deleteById = async (id) => {
  const result = await productModel.deleteById(id);
  if (!result) return { message: 'Product not found' };
  return result;
};

const update = async (info) => {
  const { id } = info;
  const productId = id;
  const productExist = await productModel.findProducts([{ productId }]);
  const productNotFound = productExist.some((element) => element.length === 0);
  if (productNotFound) return { message: 'Product not found' };
  const result = await productModel.update(info);
  return result;
};

module.exports = { getAll, getById, insert, deleteById, update };