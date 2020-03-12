require('dotenv').config();
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cors = require('cors');
const cp = require('cookie-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const passconfig = require("./config/passport");


        //middlewares
        app.use(express.static('uploads'));
        app.use(passport.initialize());
        passconfig(passport);
        app.use(cp());
        app.use(bodyParser.urlencoded({extended: false}));
        app.use(bodyParser.json());
        app.use(cors());
        app.use((req,res,next) => {
            if (req.body) console.log(req.body);
            if (req.params) console.log(req.params);
            if(req.query) console.log(req.query);
            console.log(`Received a ${req.method} request from ${req.ip} for ${req.url} with body`, req.body);
            next();
        });


        const ItemRoute = require('./routes/item');
        app.use('/items', ItemRoute);

        const UserRoute = require("./routes/user");
        app.use('/users', UserRoute);

        const ImagesRoute = require("./routes/images");
        app.use("/uploads", ImagesRoute);

        app.get('/hi', passport.authenticate('jwt', {session: false}), (req, res) => {
            res.send('hi');
        })


        module.exports = app;
