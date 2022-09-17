const { validateName } = require('../validations/validationInputValues');

const nameIsValid = (req, res, next) => {
  const { name } = req.body;
  const { message } = validateName(name);
  if (message.includes('REQUIRED')) {
    return res.status(400).json({ message: '"name" is required' });
  }
  if (message.includes('CHARACTERS_INVALID')) {
    return res
      .status(422)
      .json({ message: '"name" length must be at least 5 characters long' });
  }
  next();
};

module.exports = nameIsValid;
