
//Create express app
var express = require("express")
var app = express()
var db = require("./database.js")

//Require for post request


//Server port
var HTTP_PORT = 8000
//start Server
app.listen(HTTP_PORT,() =>{
    console.log("Server running on port: ",HTTP_PORT);
})

//Root endpoint

//Get all users
app.get("/api/users",(req,res,next) => {
    var sql = "select * from user"
    var params = []
    db.all(sql,params,(err,rows) => {
        if(err){
            res.status(400).json({"error": err.message})
            return
        }
        res.json({
            "messege": "OK",
            "data": rows
        })
    })
})


//Get user by ID
app.get("/api/user/:id",(req,res,next) => {
    var sql = "select * from user where id = ?"
    var params = [req.params.id]
    db.get(sql,params,(err,row) => {
        if(err){
            res.status(400).json({"error":err.message})
            return
        }
        res.json({
            "message": "done",
            "data" : row
        })
    })
})


//Insert here other API endpoint
//Default reponse for any other request

app.use(function(req,res){
    res.status(404)
})
