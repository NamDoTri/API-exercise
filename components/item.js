// import necessary packages/modules
const router = require('express').Router();
const fs = require('fs');
const Event = require('events');
const Item = require('../models/Item')

const path = './database/items.json';

const db = new Event();

// read item data
// TODO: make use of read stream
let items = JSON.parse( fs.readFileSync(path) );

// validators for request
const validateJSONHeaders = require('../validators/HeaderValidator');
const validateItem = require('../validators/ItemValidator');

// TODO: delivery types enumerate object
router.get('/:id(\d+)', (req, res) =>{ //number only
    let item = items.filter(i => i.id == req.params.id)[0];
    res.json(item);
});

router.get('/search', (req, res)=>{
    let result;  
    switch(req.query.type.toLowerCase()){
        case "category": 
            result = items.filter(item => item.category.toLowerCase() == req.query.keyword.toLowerCase());
            break;
        case "location": 
            result = items.filter(item => item.location.toLowerCase() == req.query.keyword.toLowerCase());
            break;
        case "date": 
            let searchDate = new Date( req.query.keyword )
            result = items.filter(item => item.datePosted == searchDate);
            break;
        default: 
            res.send("Invalid search type")
            break;
    }
    res.json( (result.length != 0) ? result : "No entries found.");
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

        db.emit('change', 'Item created.')
    }
);

router.put('/:id', (req, res)=>{
    for(let item of items){
        if(item.id == req.params.id){
            item = {
                id: item.id,
                ...req.body
            }
            items = items.map(i => (i.id == item.id) ? item : i )
            res.send(item);
            break;
        }
    };
    db.emit('change', 'Item editted.');
});

router.delete('/:id', (req, res)=>{
    items = items.filter(i => i.id != req.params.id);
    res.sendStatus(200);
    db.emit('change', 'Item deleted');
})

db.on('change', (e)=>{
    saveChanges();
    console.log(e);
    items = JSON.parse( fs.readFileSync(path) );
})

let saveChanges = () =>{
    let toWrite = JSON.stringify(items);
    fs.writeFile(path, toWrite, (err)=>{
        if(err) console.log(err);
        console.log("Saved changes.");
    });
}

module.exports = router;

