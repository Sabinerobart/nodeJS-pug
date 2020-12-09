const express = require('express');
const path = require('path');

const router = express.Router();
const rootDir = require('../utils/path');

const products = [];

router.get('/add-product', (req, res, next) => { // with get, use an exact path ('/add-product'))
  // res.sendFile(
  //   // '<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>'
  //   path.join(rootDir, 'views', 'add-product.pug')
  // );
  res.render('add-product', { pageTitle: 'Add Product', path: '/admin/add-product' })
});

router.post('/add-product', (req, res, next) => {
  products.push({ title: req.body.title })
  res.status(200).redirect('/');
});

exports.routes = router;
exports.products = products;