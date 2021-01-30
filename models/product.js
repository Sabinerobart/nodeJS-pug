const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String, // Types are not required for MongoDB, but can still choose to use them
    required: true // Can be set to required to prevent futures mistakes
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Product', productSchema); // Set the schema's name



// const getDb = require('../util/database').getDb;
// const mongodb = require('mongodb');

// class Product {
//   constructor(title, price, description, imageUrl, id, userId) {
//     this.title = title;
//     this.price = price;
//     this.description = description;
//     this.imageUrl = imageUrl;
//     this._id = id ? new mongodb.ObjectId(id) : null;
//     this.userId = new mongodb.ObjectId(userId);
//   }

//   save() {
//     const db = getDb();
//     let dbOp;
//     if (this._id) {
//       dbOp = db.collection('products').updateOne({ _id: this._id }, { $set: this });
//     } else {
//       dbOp = db.collection('products').insertOne(this);
//     }
//     return dbOp
//       .then(result => console.log('res', result))
//       .catch(err => console.log('err', err));
//   }

//   static fetchAll() {
//     const db = getDb();
//     return db.collection('products')
//       .find()
//       .toArray() // better use pagination when you know you'll receive lots of results
//       .then(products => {
//         // console.log('Find products : ', products);
//         return products;
//       })
//       .catch(err => console.log("error in fetchAll: ", err))
//   }


//   static findById(prodId) {
//     const db = getDb();
//     return db.collection('products')
//       .find({ _id: new mongodb.ObjectId(prodId) })
//       .next()
//       .then(product => {
//         // console.log('Find a product by its id : ', product);
//         return product;
//       })
//       .catch(err => console.log("error in findById: ", err))
//   }

//   static deleteById(prodId) {
//     const db = getDb();
//     return db.collection('products')
//       .deleteOne({ _id: new mongodb.ObjectId(prodId) })
//       .then(() => console.log("Deleted !"))
//       .catch(err => console.log("error in deleteById : ", err))
//   }
// }

// module.exports = Product;
