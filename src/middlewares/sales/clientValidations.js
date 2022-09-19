const inputIsValid = async (req, res, next) => {
  const input = req.body;
  const test = await input.map(({ productId, quantity }) => {
    if (!productId) {
      return res.status(400).json({ message: '"productId" is required' });
    }
    if (!quantity) {
      return res.status(400).json({ message: '"quantity" is required' });
    }
    if (quantity < 0 || quantity === 0) {
      return res
        .status(422)
        .json({ message: '"quantity" must be greater than or equal to 1' });
    }
     return [];
  });
  const sdf = await Promise.all(test);
  const val = sdf.every((el) => el.length === 0);
  if (val) return next();
};
module.exports = { inputIsValid };