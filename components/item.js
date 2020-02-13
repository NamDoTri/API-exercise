// import necessary packages/modules
const router = require('express').Router();
const fs = require('fs');
const Item = require('../models/Item')

const path = './database/items.json';

// read item data
let items = JSON.parse( fs.readFileSync(path) ).items;

// validators for request
let validateJSONHeaders = (req, res, next) =>{
    if(req.get('Content-Type') === 'application/json'){
        next();
    }
    else{
        let err = new Error('Bad Request - Missing Header');
        err.status = 400;
        next(err)
    }
}

let validateItem = () => {
    let item = new Item();
    let err = new Error();
    err.name = 'Bad Request';
    err.status = 400;

    for(let prop of Object.keys(item)){
        if (!item[prop]){
            err.message = `${prop} is missing`;
            next(err);
        }
    }
    next();
}

// TODO: delivery types enumerate object
router.get('/:id', (req, res) =>{
    let item = items.filter(i => i.id == req.params.id)[0];
    res.json(item);
});

router.get('/', (req, res) =>{
    res.json(items);
});

router.post('/',
    [
        validateJSONHeaders,
        validateItem
    ],
    (req, res) => {
        let newItem = new Item(
            items[items.length-1].id + 1, // latest id +1
            req.body.title,
            req.body.description,
            req.body.category,
            req.body.location,
            req.body.images,
            req.body.price,
            new Date(),
            req.body.deliveryType,
            req.body.sellerName,
        );

        items.push(newItem);
        res.status(201);
        res.json(newItem);

        //write to JSON file
        // fs.writeFile('../database/items.json', items, (err) =>{
        //     if(err) console.log(err)
        //     console.log('1 new item written.')
        // })
    }
);

// TODO: put request handler

router.delete('/:id', (req, res)=>{
    items = items.filter(i => i.id != req.params.id);
    res.sendStatus(200);
})

module.exports = router;

