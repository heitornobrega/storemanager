const productsAreValid = (req, res, next) => {
  let ID_IS_VALID = true;
  const incomingSell = req.body;
  for (let c = 0; c < incomingSell.length; c += 1) {
    const { productId } = incomingSell[c];
    if (!productId) {
      ID_IS_VALID = false;
      break;
    }
  }
  if (!ID_IS_VALID) {
    return res.status(400).json({ message: '"productId" is required' });
  }
  next();
};

module.exports = productsAreValid;