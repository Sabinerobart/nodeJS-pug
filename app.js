const path = require('path');
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const mongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');

const app = express();
const store = new mongoDBStore({
  uri: process.env.DB_URL,
  collection: 'sessions'
});
const csrfProtection = csrf();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');
const authRoutes = require('./routes/auth');
const User = require('./models/user');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  store: store
}));
app.use(csrfProtection); // After initializing the session middleware
app.use(flash());

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id) // Get the userId stored in the session
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
})

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn,
    res.locals.csrfToken = req.csrfToken();
  next();
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    app.listen(3000);
    console.log("---------------")
    console.log("Connected to DB")
  })
  .catch(err => {
    console.log("---------------")
    console.log("Error connecting to DB", err);
    console.log("---------------")
    console.log("Check your IPs List in MongoDB > Network Access"
    )
  })