const mongoose = require('mongoose');

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
    }
});

const user = new mongoose.model('User', schema);
module.exports = user;