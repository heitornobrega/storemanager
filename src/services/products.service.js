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

module.exports = { getAll, getById };