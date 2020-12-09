// WITHOUT EXPRESS
// const routes = require('./routes'); 
// console.log(routes.someText); 
// const server = http.createServer(routes.handler);

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const expresHbs = require('express-handlebars');

const app = express();

// With Pug as templating engine
// app.set('view engine', 'pug'); // global config for Pug
// app.set('views', 'views/pug');

// With Handlebars as templating engine
app.engine('handlebars', expresHbs({ layoutsDir: 'views/handlebars/layouts', defaultLayout: 'main-layout' }));
app.set('view engine', 'handlebars');
app.set('views', 'views/handlebars');

// app.use((req, res, next) => {
//   console.log("In the middleware");
//   next(); // Allows the request to continue to the next middleware
// });

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(shopRoutes);

// Filter the routes : the adminRoutes all begin with /admin
app.use('/admin', adminData.routes);

// Use the css static file in the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Handle 404 pages for every other routes
app.use((req, res, next) => {
  // res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
  res.status(404).render('404', { pageTitle: 404 })
})

app.listen(3000);