require('dotenv').config();
const app = require("./app");
const port = process.env.PORT || 3008;

const http = require('http');
const server = http.createServer(app);

server.listen(port, () => {
    console.log('Server running on', port);
})