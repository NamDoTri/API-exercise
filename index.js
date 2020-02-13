const app = require('express')();
const port = process.env.PORT || 3008;


// User: username and password
// item: 


app.post('/post', (req, res)=>{
    
})

app.get('/', (req, res)=>{
    res.send("Hello!")
})

app.listen(port, ()=>{
    console.log(`Listening on port ${port}...`)
})

console.log(port)
