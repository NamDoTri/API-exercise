// import necessary packages/modules
const router = require('express').Router();
const fs = require('fs');
const Event = require('events');
const Item = require('../models/Item');

const path = './database/items.json';

const db = new Event();

// read item data
// TODO: make use of read stream
let items = JSON.parse( fs.readFileSync(path) );

// validators for request
const validateJSONHeaders = require('../validators/HeaderValidator');
const validateItem = require('../validators/ItemValidator');

// TODO: delivery types enumerate object
router.get('/:id', (req, res) => {
    try {
        const id = Number.parseInt(req.params.id);

        console.log(id, typeof id);
        if (id < 1 || id > items.length + 1) {
            res.status(200).send(`Please provide a valid id. An id should be an integer bigger then 0 and less then ${items.length + 1}`);
        }

        let item = items.find(i => i.id === id);
        console.log("item", item);
        res.status(200).json(item);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.get('/search', (req, res, next) => {
    try {
        let result;
        switch (req.query.type.toLowerCase()) {
            case "category":
                result = items.filter(item => item.category.toLowerCase() === req.query.keyword.toLowerCase());
                break;
            case "location":
                result = items.filter(item => item.location.toLowerCase() === req.query.keyword.toLowerCase());
                break;
            case "date":
                let searchDate = new Date(req.query.keyword);
                result = items.filter(item => item.datePosted === searchDate);
                break;
            default:
                res.send("Invalid search type");
                break;
        }
        if (result && result.length > 0) {
            res.status(200).json(result);
        } else if (result) {
            res.status(200).send("No entries found.")
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.get('/', (req, res) =>{
    res.status(200).json(items);
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
        res.status(202).json(newItem);

        db.emit('change', 'Item created.')
    }
);

router.put('/:id',
    validateItem,
    (req, res) => {
        for (let item of items) {
            if (item.id === req.params.id) {
                item = {
                    id: item.id,
                    ...req.body
                };
                items = items.map(i => (i.id === item.id) ? item : i);
                res.send(item);
                break;
            }
        }
        db.emit('change', 'Item edited.');
    });

router.delete('/:id', (req, res) => {
    items = items.filter(i => i.id !== req.params.id);
    res.sendStatus(200);
    db.emit('change', 'Item deleted');
});


db.on('change', (e) => {
    saveChanges();
});

let saveChanges = () => {
    let toWrite = JSON.stringify(items);
    fs.writeFile(path, toWrite, (err) => {
        if (err) console.log(err);
        console.log("Saved changes.");
    });
};

module.exports = router;

