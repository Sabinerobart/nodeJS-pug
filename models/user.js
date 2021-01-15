const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');

class User {
  constructor(username, email) {
    this.name = username;
    this.email = email;
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
}
module.exports = User;