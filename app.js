// WITHOUT EXPRESS emoji
// const routes = require('./routes'); 
// console.log(routes.someText); 
// const server = http.createServer(routes.handler);

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views/ejs');

app.use(bodyParser.urlencoded({ extended: false }));

// app.use((req, res, next) => {
//   console.log("In the middleware");
//   next(); // Allows the request to continue to the next middleware
// });

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(shopRoutes);

// Filter the routes : the adminRoutes all begin with /admin
app.use('/admin', adminData.routes);

// Use the css static file in the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Handle 404 pages for every other routes
app.use((req, res, next) => {
  // res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
  res.status(404).render('404', { pageTitle: 404, pageTitle: '404' })
})

app.listen(3000);