'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.get = () => {
    return Product.find({
        active: true
    }, 'title price slug')
}