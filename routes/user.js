const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const secret = process.env.HASH_SECRET || "secret";
const passport = require('passport');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

router.post('/register', async (req, res, next) => {
    try{
        const body = req.body;
        const user = await User.findOne({email: body.email});
        if(user){
            return res.status(200).json({message: 'Email already registered'})
        }

        const newUserObj = {username: body.username, email: body.email, password: body.password};
        const salt = await bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(newUserObj.password, salt);
        newUserObj.password = hash;
        const newUser = await User.create(newUserObj);
        res.status(202).json({newUser});


    }
    catch(err){
        console.log(err);
        res.status(500).json({err})
    }
});

router.post('/login', async (req, res, next) => {
    try{
        const body = req.body;
        const email = body.email;
        const password = body.password;

        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message: 'Email not registered'});
        }

        const isPassMatch = await bcrypt.compareSync(password, user.password);
        if(isPassMatch){
            const payload = {
                id: user._id,
                name: user.username
            }

            const token = jwt.sign(payload, secret, {expiresIn: 36000});
            return res.status(200).json({success: true, token: `Bearer ${token}`})
        }

    }
    catch(err){
        req.status(500).json({err})
    }
})




module.exports = router;
