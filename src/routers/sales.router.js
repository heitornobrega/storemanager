const express = require('express');
const { salesController } = require('../controllers');
// const nameIsValid = require("../middlewares/products/nameIsValid");

const router = express.Router();

router.get('/', salesController.getAll);
router.get('/:id', salesController.getById);

module.exports = router;