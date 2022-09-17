const { productModel } = require('../../models');
const { idSchema } = require('./schemas');

const validateId = async (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { type: 'INVALID_VALUE', message: error.message };
  const product = await productModel.getById(id);
  if (product.length === 0) return { type: 'ID_NOT_FOUND', message: 'Product not found' };
  return { type: null, message: '' };
};

module.exports = { validateId };