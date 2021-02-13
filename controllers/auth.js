const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: req.session.isLoggedIn
  })
};

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    isAuthenticated: false
  });
};

exports.postSignup = (req, res, next) => { };

exports.postLogin = (req, res, next) => {
  User.findById(process.env.DUMMY_USER_ID) // Get the userId from DB => the dummy user created on app initialization (l.45)
    .then(user => {
      req.session.isLoggedIn = true;
      req.session.user = user; // Store the created user in the request
      req.session.save(err => { // Ensures the session is saved to mongoDB before redirect (prevent delayed infos)
        console.log("Error saving the session", err)
        res.redirect('/');
      })
    })
    .catch(err => console.log(err));
  // next(); // Was added to bypass the user identification flow
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => { // method provided by the installed session package
    console.log("Logging out", err)
    res.redirect('/')
  });
};
