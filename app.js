require('dotenv').config();
const app = require('express')();

const bodyParser = require('body-parser');
const cors = require('cors');
const cp = require('cookie-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const passconfig = require("./config/passport");
const log = console.log




        mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(data => {
            console.log("Mongo connection", data);
        }).catch(err => {
           console.log("Error in connecting to mondodb")
        });

        //middlewares
        app.use(passport.initialize());
        passconfig(passport);
        app.use(cp());
        app.use(bodyParser.urlencoded({extended: false}));
        app.use(bodyParser.json());
        app.use(cors());
        app.use((req,res,next) => {
            if (req.body) log(req.body);
            if (req.params) log(req.params);
            if(req.query) log(req.query);
            log(`Received a ${req.method} request from ${req.ip} for ${req.url}`);
            next();
        });


        const ItemRoute = require('./routes/item');
        app.use('/items', ItemRoute);

        const UserRoute = require("./routes/user");
        app.use('/users', UserRoute);

        app.get('/hi', passport.authenticate('jwt', {session: false}), (req, res) => {
            res.send('hi');
        })


        module.exporta = app;
