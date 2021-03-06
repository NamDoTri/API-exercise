// import necessary packages/modules
const router = require('express').Router();
const Item = require('../models/item');
const passport = require('passport');
const multer = require('multer');
const fs = require("fs");
const uuid = require('uuid');
const uuidv4 = uuid.v4;
const path = require('path');

// validators for request
const validateJSONHeaders = require('../validators/HeaderValidator');


router.get('/search', async (req, res, next) => {
  try {
      let filter = JSON.parse(
          `{ "${req.query.type}": "${req.query.keyword}" }`
      );
      let result = await Item.find(filter);
      res.status(200).json(result);
  } catch (err) {
      console.log(err);
      res.status(500).send(err.message);
  }
});

router.get('/:id',  async (req, res) => {
    let result;
    try {
        if(!req.params.id || req.params.id.toLowerCase() == 'all'){
            result = await Item.find({});
            res.status(200).json({result});
        }else{
            result = await Item.findById(req.params.id);
            res.status(200).json(result);
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.get('/', async (req, res) =>{
    try{
        const items = await Item.find({});
        res.status(200).json({items});

    }
    catch(err){
        res.status(500).json(err.message);
    }
});

router.post('/',
    passport.authenticate('jwt', {session: false}),
    async (req, res) => {
        try{
            const item = await Item.create({...req.body});
            res.status(202).json({item});
        }
        catch(err){
            res.status(500).send(err.message);
        }
    }
);

router.put('/:id',passport.authenticate('jwt', {session: false}),
   async (req, res) => {
       try{
           //TODO Check if seller id matches the one saved in the item
           const item = await Item.updateOne({_id: req.params.id}, {...req.body});
           res.status(202).json({item});
       }
       catch(err){
           res.status(500).send(err.message);
       }
    });

router.post('/bulk', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    try{

        const items = req.body.items;

        if(!items || Array.isArray(items)){
            res.status(400).json({message: "Items missing or not an array"})
        }
        const item = await Item.collection.insertMany(items);
        res.status(202).json({item});
    }
    catch(err){
        res.status(500).send(err.message);
    }
})

router.delete('/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try{
        //TODO Check if seller id matches the one saved in the item
        const item = await Item.deleteOne({_id: req.params.id});
        res.status(202).json({item});
    }
    catch(err){
        res.status(500).send(err.message);
    }
});





module.exports = router;

