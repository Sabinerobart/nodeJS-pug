
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views/ejs');

app.use(bodyParser.urlencoded({ extended: false }));
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const { notFound } = require('./controllers/error');

app.use(shopRoutes);

// Filter the routes : the adminRoutes all begin with /admin
app.use('/admin', adminRoutes);

// Use the css static file in the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Handle 404 pages for every other routes
app.use(notFound);

app.listen(3000);