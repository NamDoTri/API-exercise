const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: String,
    email: String
});

const model = new mongoose.model('Seller', schema);

module.exports = model;