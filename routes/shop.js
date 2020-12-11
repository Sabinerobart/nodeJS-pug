const express = require('express');
const { getProducts, getIndex, getCart, getCheckout, getOrders, getProduct, postCart, deleteFromCart } = require('../controllers/shop');

const router = express.Router();

router.get('/', getIndex);
router.get('/products', getProducts);
router.get('/products/:id', getProduct);
router.get('/cart', getCart);
router.post('/cart', postCart);
router.post('/cart-delete-item', deleteFromCart);
router.get('/orders', getOrders);
router.get('/checkout', getCheckout);

module.exports = router;
