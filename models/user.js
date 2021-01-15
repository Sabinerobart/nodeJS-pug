const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');

class User {
  constructor(username, email, cart, id) {
    this.name = username;
    this.email = email;
    this.cart = cart;
    this.id = id;
  }

  save() {
    const db = getDb();
    let dbOp;
    return dbOp = db.collection('users').insertOne(this);
  }

  static findById(userId) {
    const db = getDb();

    return db.collection('users')
      .findOne({ _id: new mongodb.ObjectId(userId) });
  }

  addToCart(product) {
    // const cartProduct = this.cart.items.findIndex(cp => {
    //   return cp._id = product._id;
    // });
    const updatedCart = {
      items: [{ productId: new mongodb.ObjectId(product._id), quantity: 1 }]
    };
    const db = getDb();
    return db.collection('users')
      .updateOne(
        { _id: new mongodb.ObjectId(this.id) },
        { $set: { cart: updatedCart } } // overwrite the old cart with the new one, keep all other infos
      )
  }
}
module.exports = User;
