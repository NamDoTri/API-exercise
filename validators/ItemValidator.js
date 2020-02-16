const Item = require('../models/Item');

let validateItem = (req, res, next) => {
    let err = new Error();
    err.name = 'Bad Request';
    err.status = 400;

    let item = new Item(
        1, // placeholder
        req.body.title,
        req.body.description,
        req.body.category,
        req.body.location,
        req.body.images,
        req.body.price,
        new Date(),
        req.body.deliveryType,
        req.body.sellerName,
    )
    
    for(let prop of Object.keys(item)){
        if (!item[prop]){
            err.message = `${prop} is missing`;
            next(err);
        }
    }

    next();
}

module.exports = validateItem;