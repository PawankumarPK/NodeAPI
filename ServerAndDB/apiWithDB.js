
//Create express app
var express = require("express")
var app = express()
var db = require("./database.js")

//Require for post request
var md5 = require("md5")
var bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())


//Server port
var HTTP_PORT = 9000
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

//Post api
app.post("/api/user/",(req,res,next) => {
    var error = []
    if(!req.body.password){
        error.push("No password specified")
    }
    if(!req.body.email){
        error.push("No email specified")
    }
    if(error.length){
        res.status(400).json({"error" : error.join(",")})
        return
    }
    var data = {
        name: req.body.name,
        email: req.body.email,
        password: md5(req.body.password)
    }
    var sql = 'INSERT INTO user (name,email,password) VALUES(?,?,?)'
    var params = [data.name, data.email, data.password]
    db.run(sql,params,function(err,result){
        if(err){
            res.status(400).json({"error": err.message})
            return
        }
        res.json({
            "message": "success",
            "data": data,
            "id": this.lastID

        })
    })
})


//Insert here other API endpoint
//Default reponse for any other request

app.use(function(req,res){
    res.status(404)
})
