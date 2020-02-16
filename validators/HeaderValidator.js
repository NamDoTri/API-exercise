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

module.exports = validateJSONHeaders;