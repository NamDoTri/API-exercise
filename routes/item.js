// import necessary packages/modules
const router = require('express').Router();
const Item = require('../models/Item');
const passport = require('passport');


// validators for request
const validateJSONHeaders = require('../validators/HeaderValidator');


router.get('/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        const item = await Item.findById(id);
        res.status(200).json(item);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.get('/search', (req, res, next) => {
    try {
        //TODO
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.get('/', passport.authenticate('jwt', {session: false}), async (req, res) =>{
    try{
        const items = await Item.find({});
        res.status(200).json({items});

    }
    catch(err){
        res.status(500).send(err.message);
    }

});

router.post('/',passport.authenticate('jwt', {session: false}),

    async (req, res) => {
        try{
            console.log("here");
            console.log(req.body);
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
           const item = await Item.updateOne({id: req.params.id}, {...req.body});
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
        const item = await Item.deleteOne({id: req.params.id});
        res.status(202).json({item});
    }
    catch(err){
        res.status(500).send(err.message);
    }
});



module.exports = router;

