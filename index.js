const app = require('express')();
const port = process.env.PORT || 3008;
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const ItemComponent = require('./components/item');

app.use(bodyParser.json());
app.use(cors());

app.use('/items', ItemComponent);

app.get('/', (req, res)=>{    
    res.send("Hello!")
})

app.listen(port, ()=>{
    console.log(`Listening on port ${port}...`)
})

console.log(port)
