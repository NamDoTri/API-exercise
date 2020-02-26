require('dotenv').config();
const app = require("./app");
const port = process.env.PORT || 3008;
const mongoose = require('mongoose');

 mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then (data => {
            console.log('mongo established connection ...');
        }).catch(err => {
            console.log("Failed to established connection", err);
        });



const http = require('http');
const server = http.createServer(app);

server.listen(port, () => {
    console.log('Server running on', port);
})