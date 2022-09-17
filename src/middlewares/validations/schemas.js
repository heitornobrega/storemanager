const Joi = require('joi');

const idSchema = Joi.number().integer().min(1).required();
const name = Joi.string().min(5).required().messages({
  'string.min': 'CHARACTERS_INVALID',
  'any.required': 'REQUIRED',
});

module.exports = {
  idSchema,
  name,
};