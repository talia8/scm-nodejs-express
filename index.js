/**
 * Express application setup for managing suppliers, products, customers, orders, product orders, and reports.
 * @module App
 * @requires express
 * @requires dotenv
 * @requires body-parser
 * @requires module:./routes/supplierRoutes
 * @requires module:./routes/productRoutes
 * @requires module:./routes/customerRoutes
 * @requires module:./routes/orderRoutes
 * @requires module:./routes/productOrderRoutes
 * @requires module:./routes/reportRoutes
 **/

const express = require("express");
require('dotenv').config();

const bodyParser = require('body-parser');
const app = express();
const port = process.env.APP_PORT;

app.engine('html', require('ejs').renderFile);
const path = require('path');

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

// Set the view engine to use EJS
app.set('view engine', 'ejs');
// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Routes for different modules
const supplierRoutes = require('./routes/supplierRoutes');
const productRoutes = require('./routes/productRoutes');
const customerRoutes = require('./routes/customerRoutes');
const orderRoutes = require('./routes/orderRoutes');
const productOrderRoutes = require('./routes/productOrderRoutes');
const reportRoutes = require('./routes/reportRoutes');
const appRoutes = require('./routes/appRoutes');

// Define routes for each module
app.use('/api/', appRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/products', productRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/productOrders', productOrderRoutes);
app.use('/api/reports', reportRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
