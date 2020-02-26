require('dotenv').config();
const mongoose = require('mongoose');

module.exports.connect = async () => {
    return mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}