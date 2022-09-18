const express = require('express');
const { productsController } = require('../controllers');
const nameIsValid = require('../middlewares/products/nameIsValid');

const router = express.Router();

router.get('/', productsController.getAll);
router.get('/:id', productsController.getById);
router.post('/', nameIsValid, productsController.insert);
router.delete('/:id', productsController.deleteById);

module.exports = router;