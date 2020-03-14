const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
    type: String,
        required: true
},
    location: {
        type: String,
        required: true
    },
    images: String,
    askingPrice: {
        type: Number,
        required: true
    },
    dateOfPosting: String,
    deliveryType: {
        type: String,
        enum: ['Shipping', 'Pickup'],
        default: 'Shipping',
        required: true
    },
    seller: {
        required: true,
        type: mongoose.Schema.Types.ObjectID,
        ref: "User"
    }
});

const item = new mongoose.model('Item', schema);

module.exports = item;