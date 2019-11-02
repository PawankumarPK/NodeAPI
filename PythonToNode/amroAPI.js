//Create express app
var express = require("express")
var app = express()

const sqlite3 = require('sqlite3').verbose();
// open the database
let db = new sqlite3.Database('sar.db');


//print in terminal
let sql = `SELECT  CreatedOn FROM device_stats
           ORDER BY name`;  
 
           db.all(sql, [], (err, rows) => {
            if (err) {
                res.status(400).json({"error":err.message})
              throw err;
            }
            rows.forEach((row) => {
              console.log(row.name);
            });
          });
          


//Api created
app.get("/api/users", (req, res, next) => {
    let sql = `SELECT CreatedOn FROM device_stats `;  
    var params = []
    
    db.all(sql,params,(err,rows) => {

        if (err) {
            res.status(400).json({"error":err.message})
            return;
        }
        res.json({
            "message" : "Success",
            "data" : rows
        })  

    });
    
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));


//SELECT rooms.Id,rooms.Name FROM rooms WHERE FloorId=?''',(floorId,)