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
app.get('/', (req, res) => {
    res.send('Welcome to Edurekas REST API with Node.js Tutorial!!');
});

app.get('/api/books',(req,res)=>{
    console.log( books );  
    res.send(books)
});

app.get('/api/books/:id',(req,res)=>{
    const books = book.find(c => c.id === parseInt(req.params.id));

    if(!book) res.status(404).send('Cant find what you are looking for!</h2>');
    res.send(book); 
})

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));