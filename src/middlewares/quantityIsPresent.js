const quantityIsPresent = (req, res, next) => {
  let QUANTITY_IS_VALID = true;
  const incomingSell = req.body;
  for (let c = 0; c < incomingSell.length; c += 1) {
    const { quantity } = incomingSell[c];
    if (quantity === undefined) {
      QUANTITY_IS_VALID = false;
      break;
    }
  }
  if (!QUANTITY_IS_VALID) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  next();
};
module.exports = quantityIsPresent;
