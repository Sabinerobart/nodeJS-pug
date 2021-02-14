const Product = require('../models/product');
const Order = require('../models/order');

exports.getProducts = (req, res, next) => {
  Product.find()
    .then(products => {
      console.log('🚀 ~ file: shop.js ~ line 6 ~ products', products)
      res.render('shop/product-list', {
        products: products,
        pageTitle: 'All Products',
        path: '/products'
      });
    })
    .catch(err => {
      console.log("Error while fetching all products :", err);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId) // Method provided by mongoose
    .then(product => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products'
      });
    })
    .catch(err => console.log("Error while fetching a single product : ", err));
};

exports.getIndex = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render('shop/index', {
        products: products,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    .execPopulate() // Added because .populate() doesn't return a promise, so we couldn't chain .then()
    .then(user => {
      console.log('🚀 ~ file: shop.js ~ line 50 ~ user.cart.items', user.cart.items);
      const cart = user.cart.items;
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: cart
      });
    })
    .catch(err => console.log("getCart error : ", err));
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then(product => {
      return req.user.addToCart(product);
    })
    .then(result => {
      console.log("postCart result : ", req.user);
      res.redirect('/cart');
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .removeFromCart(prodId)
    .then(() => {
      console.log(`Item ${prodId} deleted !`)
      res.redirect('/cart');
    })
    .catch(err => console.log("postCartDeleteProduct error:", err));
};

exports.postOrder = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    .execPopulate() // Added because .populate() doesn't return a promise, so we couldn't chain .then()
    .then(user => {
      console.log('🚀 ~ file: shop.js ~ line 91 ~ user', user)
      const products = user.cart.items.map(i => {
        return {
          quantity: i.quantity,
          product: { ...i.productId._doc } // spread all content stored in the productId, and with ._doc we keep the infos we need instead of all mongoDb infos
        }
      });

      const order = new Order({
        user: {
          name: req.user.name,
          userId: req.user // mongoose picks the id itself
        },
        products: products
      });
      order.save()
    })
    .then(() => {
      return req.user.clearCart();
    })
    .then(() => {
      res.redirect('/orders');
    })
    .catch(err => console.log("post order error : ", err));
};

exports.getOrders = (req, res, next) => {
  Order.find({ "user.userId": req.user._id })
    .then(orders => {
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders
      });
    })
    .catch(err => console.log("Error getting orders", err));
};
