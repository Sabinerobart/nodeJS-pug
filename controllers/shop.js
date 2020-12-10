const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      products: products,
      pageTitle: 'Products',
      path: '/products'
    });
  });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.id;
  Product.findById(prodId, product => {
    res.render('shop/product-detail', {
      product: product,
      pageTitle: product.title,
      path: '/products'
    })
  })
};

exports.getIndex = (req, res) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      products: products,
      pageTitle: 'Shop index',
      path: '/'
    });
  });
};

exports.getCart = (req, res) => {
  res.render('shop/cart', {
    pageTitle: 'Your Cart',
    path: '/cart'
  })
};

exports.postCart = (req, res) => {
  const id = req.body.productId;
  console.log('🚀 ~ file: shop.js ~ line 43 ~ id', id);
  res.redirect('/cart');
}

exports.getCheckout = (req, res) => {
  res.render('shop/checkout', {
    pageTitle: 'Checkout',
    path: '/checkout'
  })
};

exports.getOrders = (req, res) => {
  res.render('shop/orders', {
    pageTitle: 'Your Orders',
    path: '/orders'
  })
}