const express = require('express');
const { getAddProduct, postAddProduct, getAdminProducts } = require('../controllers/admin');

const router = express.Router();

router.get('/add-product', getAddProduct);

router.post('/add-product', postAddProduct);

router.get('/products', getAdminProducts);

module.exports = router;