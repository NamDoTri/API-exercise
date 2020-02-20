// import necessary packages/modules
const router = require('express').Router();
const Item = require('../models/Item');


// validators for request
const validateJSONHeaders = require('../validators/HeaderValidator');

router.get('/search', async (req, res, next) => {
    try {
        let filter = JSON.parse(
            `{ "${req.query.type.toLowerCase()}": "${req.query.keyword}" }`
        );
        let result = await Item.find(filter);
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
});

router.get('/:id?', async (req, res) => {
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

router.post('/',
    [
        validateJSONHeaders
    ],

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

router.put('/:id',
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

