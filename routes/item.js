// import necessary packages/modules
const router = require('express').Router();
const Item = require('../models/Item');


// validators for request
const validateJSONHeaders = require('../validators/HeaderValidator');
const validateItem = require('../validators/ItemValidator');

// TODO: delivery types enumerate object
router.get('/:id', async (req, res) => {
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

router.get('/', async (req, res) =>{
    try{
        const items = await Item.find({});
        res.status(200).json({items});

    }
    catch(err){
        res.status(500).send(err.message);
    }

});

router.post('/',
    [
        validateJSONHeaders
    ],

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

router.put('/:id',
    validateItem,
   async (req, res) => {
       try{
           const item = await Item.updateOne({id: req.params.id}, {...req.body});
           res.status(202).json({item});
       }
       catch(err){
           res.status(500).send(err.message);
       }
    });

router.delete('/:id', async (req, res) => {
    try{
        const item = await Item.deleteOne({id: req.params.id});
        res.status(202).json({item});
    }
    catch(err){
        res.status(500).send(err.message);
    }
});



module.exports = router;

