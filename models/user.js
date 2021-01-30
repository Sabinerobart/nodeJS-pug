// const getDb = require('../util/database').getDb;
// const mongodb = require('mongodb');

// class User {
//   constructor(username, email, cart, id) {
//     this.name = username;
//     this.email = email;
//     this.cart = cart;
//     this._id = id;
//   }

//   save() {
//     const db = getDb();
//     let dbOp;
//     return dbOp = db.collection('users').insertOne(this);
//   }

//   static findById(userId) {
//     const db = getDb();

//     return db.collection('users')
//       .findOne({ _id: new mongodb.ObjectId(userId) });
//   }

//   addToCart(product) {
//     const cartProductIndex = this.cart.items.findIndex(cp => {
//       return cp.productId.toString() === product._id.toString(); // toString() because the value sent by mongodb is not exactly a string
//     });
//     let newQuantity = 1;
//     const updatedCartItems = [...this.cart.items];

//     if (cartProductIndex >= 0) {
//       newQuantity = this.cart.items[cartProductIndex].quantity + 1;
//       updatedCartItems[cartProductIndex].quantity = newQuantity;
//     } else {
//       updatedCartItems.push({ productId: new mongodb.ObjectId(product._id), quantity: newQuantity });
//     }

//     const updatedCart = {
//       items: updatedCartItems
//     };

//     const db = getDb();
//     return db.collection('users')
//       .updateOne(
//         { _id: new mongodb.ObjectId(this.id) },
//         { $set: { cart: updatedCart } } // overwrite the old cart with the new one, keep all other infos
//       )
//   }

//   getCart() {
//     const db = getDb();
//     const productIds = this.cart.items.map(x => x.productId);
//     return db.collection('products')
//       .find({ _id: { $in: productIds } })
//       .toArray()
//       .then(products => {
//         return products.map(product => {
//           return {
//             ...product,
//             quantity: this.cart.items.find(i => i.productId?.toString() === product._id?.toString())?.quantity
//           }
//         })
//       })
//   }

//   deleteItemFromCart(prodId) {
//     const updatedCartItems = this.cart.items.filter(item => item.productId.toString() !== prodId.toString());
//     const db = getDb();
//     return db.collection('users')
//       .updateOne(
//         { _id: new mongodb.ObjectId(this.id) },
//         { $set: { cart: { items: updatedCartItems } } } // overwrite the old cart with the new one, keep all other infos
//       )
//   }

//   addOrder() {
//     const db = getDb();
//     return this.getCart()
//       .then(products => {
//         const order = {
//           items: products,
//           user: {
//             _id: new mongodb.ObjectId(this._id),
//             name: this.name
//           }
//         };
//         return db.collection('orders').insertOne(order);
//       })
//       .then(result => {
//         this.cart = { items: [] };
//         return db
//           .collection('users')
//           .updateOne(
//             { _id: new mongodb.ObjectId(this._id) },
//             { $set: { cart: { items: [] } } }
//           );
//       });
//   }

//   getOrders() {
//     const db = getDb();
//     return db.collection('orders')
//       .find({ 'user._id': new mongodb.ObjectId(this._id) })
//       .toArray();
//   }
// }
// module.exports = User;
