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
    seller: {
        type: mongoose.Schema.Types.ObjectID,
        ref: "User"
    }
});

const item = new mongoose.model('Item', schema);

module.exports = item;