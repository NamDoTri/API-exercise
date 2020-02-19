const app = require('express')();
const port = process.env.PORT || 3008;
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const mongoose = require('mongoose');
require('dotenv').config();

const setup = async () => {
    try{

        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });


        app.use(bodyParser.json());
        app.use(cors());
        const ItemRoute = require('./routes/item');


        app.use('/items', ItemRoute);

        app.get('/', (req, res) => {
            res.send("Hello!")
        });

        app.listen(port, () => {
            console.log(`Listening on port ${port}...`)
        });
    }
    catch(err){
        console.log(err);
    }
}


setup();

