const express = require('express');
const { salesController } = require('../controllers');
// const { inputIsValid } = require('../middlewares/sales/clientValidations');
const quantityIsValid = require('../middlewares/quantityisValid');
const productsAreValid = require('../middlewares/productsAreValid');
const quantityIsPresent = require('../middlewares/quantityIsPresent');
const productIsPresent = require('../middlewares/productIsPresent');

const router = express.Router();

router.get('/', salesController.getAll);
router.get('/:id', salesController.getById);
router.post(
  '/',
  productsAreValid,
  quantityIsPresent,
  quantityIsValid,
  salesController.insert,
);
router.delete('/:id', salesController.deleteById);
router.put(
  '/:id',
  productIsPresent,
  productsAreValid,
  quantityIsPresent,
  quantityIsValid,
  salesController.update,
);

module.exports = router;