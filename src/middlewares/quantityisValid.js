const quantityIsValid = (req, res, next) => {
  let QUANTITY_IS_VALID = true;
 const incomingSell = req.body;
  for (let c = 0; c < incomingSell.length; c += 1) {
    const { quantity } = incomingSell[c];
    // console.log(quantity);
    if (quantity <= 0) {
      QUANTITY_IS_VALID = false;
      break;
    }
  }
      if (!QUANTITY_IS_VALID) {
        return res
          .status(422)
          .json({ message: '"quantity" must be greater than or equal to 1' });
      }
  next();
};

module.exports = quantityIsValid;