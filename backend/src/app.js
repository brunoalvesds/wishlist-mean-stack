const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


//Database connection
mongoose.connect('mongodb+srv://b_adm:b_adm@cluster0-4bylm.mongodb.net/test?retryWrites=true&w=majority');

const app = express();
const router = express.Router();

//Load Models
const Product = require('./models/products');

//Load routes
const indexRoute = require('./routes/index');
const productsRoute = require('./routes/products');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/', indexRoute);
app.use('/products', productsRoute);



module.exports = app;