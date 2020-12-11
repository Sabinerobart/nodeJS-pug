const express = require('express');
const { getAddProduct, postAddProduct, getAdminProducts, getEditProduct, postEditProduct } = require('../controllers/admin');

const router = express.Router();

router.get('/add-product', getAddProduct);

router.post('/add-product', postAddProduct);

router.get('/products', getAdminProducts);

router.get('/edit-product/:id', getEditProduct);

router.post('/edit-product', postEditProduct);

module.exports = router;