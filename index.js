require('dotenv').config();
const app = require('express')();
const port = process.env.PORT || 3008;
const bodyParser = require('body-parser');
const cors = require('cors');
const cp = require('cookie-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const passconfig = require("./config/passport");


const setup = async () => {
    try{

        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        //middlewares
        app.use(passport.initialize());
        passconfig(passport);
        app.use(cp());
        app.use(bodyParser.urlencoded({extended: false}));
        app.use(bodyParser.json());
        app.use(cors());
        app.use((req,res,next) => {
            if (req.body) log.info(req.body);
            if (req.params) log.info(req.params);
            if(req.query) log.info(req.query);
            log.info(`Received a ${req.method} request from ${req.ip} for ${req.url}`);
            next();
        });


        const ItemRoute = require('./routes/item');
        app.use('/items', ItemRoute);

        const UserRoute = require("./routes/user");
        app.use('/users', UserRoute);

        app.listen(port, () => {
            console.log(`Listening on port ${port}...`)
        });
    }
    catch(err){
        console.log(err);
    }
}


setup();

