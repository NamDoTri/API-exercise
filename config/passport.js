require('dotenv').config();
const ppJwt = require('passport-jwt');
const Strategy = ppJwt.Strategy;
const ExtractJwt = ppJwt.ExtractJwt;
const secret = process.env.HASH_SECRET || "secret";
const mongoose = require('mongoose');
const User = require('../models/user');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret
};

module.exports = (passport) => {
    passport.use(new Strategy(options, (payload, done) => {

        console.log('payload in middleware', payload);
        User.findById(payload.id)
            .then(user => {

                if(user){
                    return done(null, {id: user.name, email: user.email});
                }

                return done(null, false);
            })
            .catch(err => console.log(err));
    }));
};
