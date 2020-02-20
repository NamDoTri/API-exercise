const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    category: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    images: [String],
    askingPrice: {
        type: Number,
        required: true
    },
    dateOfPosting: Date,
    deliveryType: {
        type: String,
        enum: ['Shipping', 'Pickup'],
        default: 'Shipping'
    },
    seller: {
        type: mongoose.Schema.Types.ObjectID,
        ref: "User",
        required: true
    }
});

const item = new mongoose.model('Item', schema);

module.exports = item;