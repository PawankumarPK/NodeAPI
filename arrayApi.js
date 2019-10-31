const express = require('express')
//const Joi = require('joi'); //used for validation
const app = express()

//app.use(express.json())
//app.use(express.bodyParser())

const books = [
    {title : 'Harry Porter', id: 1} ,
    {title : 'Twilite', id: 2} ,
    {title : 'Hero', id: 3} ,
]

//Read Request Handlers
// app.get('/', (req, res) => {
//     res.send('Welcome to Edurekas REST API with Node.js Tutorial!!');
// });

app.get('/api/books',(req,res)=>{
    console.log( books );  
    res.send(books)
});


const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));