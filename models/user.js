const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    dateAdded: Date,
    item: mongoose.Schema.Types.ObjectID
});
const schema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    items: [itemSchema]
});

const user = new mongoose.model('User', schema);
module.exports = user;