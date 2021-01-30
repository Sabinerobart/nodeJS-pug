const path = require('path');
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const User = require('./models/user');

app.use((req, res, next) => {
  User.findById(process.env.DUMMY_USER_ID)
    .then(user => {
      req.user = new User(user.name, user.email, user.cart || { items: [] }, user._id);
      next();
    })
    .catch(err => console.log(err));
  // next(); // Was added to bypass the user identification flow
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect(process.env.DB_URL)
  .then(() => {
    app.listen(3000);
    console.log("---------------")
    console.log("Connected to DB")
  })
  .catch(() => console.log("Error connecting to DB"))