const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://Sabine:${process.env.DB_PASSWORD}@cluster0.a4yzr.mongodb.net/shop?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true });

let _db;

const mongoConnect = callback => {
  client.connect(err => {
    if (err) {
      console.log('🚀 ~ file: database.js ~ line 10 ~ err', err);
      client.close();
    }
    // perform actions on the collection object
    const collection = client.db("test").collection("devices");
    console.log('Connected !');
    _db = client.db();
    callback();
  });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found'
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;