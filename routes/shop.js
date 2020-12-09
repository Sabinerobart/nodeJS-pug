const express = require('express');
// const path = require('path');

const router = express.Router();
// const rootDir = require('../utils/path');
const adminData = require('./admin');

router.get('/', (req, res, next) => {
  const products = adminData.products;
  console.log('object :', products); // infos on the node server, cross-users, not what you want !
  // res.send('<h1>Hello from Express!</h1>');
  // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
  res.render('shop', {
    products,
    docTitle: 'Shop',
    path: '/',
    pageTitle: 'Shop',
    hasProducts: products.length > 0,
    activeShop: true,
    productCSS: true
  });
});

module.exports = router;
