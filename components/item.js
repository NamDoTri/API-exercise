const router = require('express')().Router();
const fs = require('fs');
const Item = require('../models/Item')

const path = '../database/items.json';

let items = JSON.parse( fs.readFileSync(path) );

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



