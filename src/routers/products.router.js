const express = require('express');
const { productsController } = require('../controllers');
const nameIsValid = require('../middlewares/products/nameIsValid');

const router = express.Router();

router.get('/search?', productsController.getByName);
router.get('/', productsController.getAll);
router.get('/:id', productsController.getById);
router.post('/', nameIsValid, productsController.insert);
router.delete('/:id', productsController.deleteById);
router.put('/:id', nameIsValid, productsController.update);

module.exports = router;