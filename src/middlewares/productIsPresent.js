const productIsPresent = (req, res, next) => {
  let PRODUCT_ISPRESENT = true;
  const incomingSell = req.body;
  for (let c = 0; c < incomingSell.length; c += 1) {
    const { productId } = incomingSell[c];
    if (productId === undefined) {
      PRODUCT_ISPRESENT = false;
      break;
    }
  }
  if (!PRODUCT_ISPRESENT) {
    return res.status(400).json({ message: '"productId" is required' });
  }
  next();
};
module.exports = productIsPresent;
