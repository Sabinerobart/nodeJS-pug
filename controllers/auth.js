const bcrypt = require('bcryptjs');

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

exports.postSignup = (req, res, next) => {
  const { email, password, confirmPassword } = req.body;
  // Check if MongoDB already has a user with this email
  // (another way => create an index on the email field and give that index a uniq property)
  User.findOne({ email: email })
    .then(userDoc => {
      if (userDoc) {
        // alert("This email already exists");
        return res.redirect('/signup') // if user already exists, stay on the page
      }
      return bcrypt
        .hash(password, parseInt(process.env.SALT))// Use parseInt to convert the env value from string to number
        .then(hashedPassword => {
          const user = new User({
            email: email,
            password: hashedPassword,
            cart: { items: [] }
          });
          return user.save();
        });
    })
    .then(() => {
      res.redirect('/login');
    })
    .catch(err => console.log("Error checking if the user already exists on signup", err));
};

exports.postLogin = (req, res, next) => {
  User.findById(process.env.DUMMY_USER_ID) // Get the userId from DB => the dummy user created on app initialization (~ l.59)
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
