const products = [];

exports.getAddProduct = (req, res, next) => { // with get, use an exact path ('/add-product'))
  // res.sendFile(
  //   // '<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>'
  //   path.join(rootDir, 'views', 'add-product.pug')
  // );
  res.render('add-product', { pageTitle: 'Add Product', path: '/admin/add-product' })
};

exports.postAddProduct = (req, res, next) => {
  products.push({ title: req.body.title })
  res.status(200).redirect('/');
};

exports.getProducts = (req, res, next) => {
  console.log('object :', products); // infos on the node server, cross-users, not what you want !
  // res.send('<h1>Hello from Express!</h1>');
  // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
  res.render('shop', { products, docTitle: 'Shop', path: '/', pageTitle: 'Shop' });
};