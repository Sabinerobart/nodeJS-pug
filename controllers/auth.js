const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: req.session.isLoggedIn
  })
};

exports.postLogin = (req, res, next) => {
  User.findById(process.env.DUMMY_USER_ID) // Get the userId from DB => the dummy user created on app initialization (l.45)
    .then(user => {
      req.session.isLoggedIn = true;
      req.session.user = user; // Store the created user in the request
      res.redirect('/');
    })
    .catch(err => console.log(err));
  // next(); // Was added to bypass the user identification flow
};
