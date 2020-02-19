const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title: String,
    description: String,
    category: String,
    location: String,
    images: [String],
    askingPrice: Number,
    dateOfPosting: Date,
    deliveryType: {
        type: String,
        enum: ['Shipping', 'Pickup'],
        default: 'Shipping'
    },
    seller: mongoose.Schema.Types.ObjectID
});

const model = new mongoose.model('Item', schema);

module.exports = model;