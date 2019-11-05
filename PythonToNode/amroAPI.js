var express = require("express")
var app = express()

const sqlite3 = require('sqlite3').verbose();
// open the database
let db = new sqlite3.Database('sar.db');
var params = []

//var path = " ";

function declareAllFunctions() {

  device_stats()
  amro_stock()
  face_tracking()
  amro_trips()
  floors()
  rooms()
  get_user_from_pin()
  get_stock_from_tripId()
  get_floor_and_rooms()
  get_trip_status()
  //get_stock_from_barcode()
  get_user_from_pin()
  move()
}

//Api created

function get_stock_from_tripId() {
  app.get("/amro-stock", (req, res) => {
    let sql = 'SELECT stock.Id,stock.Name,amro_stock.Quantity,TripId FROM amro_stock LEFT JOIN stock ON stock.Id=amro_stock.StockId WHERE TripId=?', t;
    db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({ "error": err.message })
        return;
      }
      res.json({
        "data": rows
      })
    });
  });

}

function get_floor_and_rooms(){
  app.get("/floors-rooms", (req, res) => {
    let sql = 'SELECT rooms.Id,rooms.Name,floors.Id,floors.Name FROM rooms LEFT JOIN floors ON floors.Id=rooms.FloorId'
    db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({ "error": err.message })
        return;
      }
      res.json({
        "data": rows
      })
    });
  });

}


function device_stats() {
  app.get("/device_stats", (req, res) => {
    let sql = `SELECT Name,Value FROM device_stats`;
    db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({ "error": err.message })
        return;
      }
      res.json({
        "data": rows
      })
    });
  });

}

function amro_stock() {
  app.get("/amro_stock", (req, res) => {
    let sql = `SELECT CreatedOn FROM amro_stock`;
    db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({ "error": err.message })
        return;
      }
      res.json({
        "data": rows
      })
    })
  })

}

function face_tracking() {
  app.get("/face_tracking", (req, res) => {
    let sql = `SELECT X,Y FROM face_tracking ORDER BY Id DESC LIMIT 1 `;
    db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({ "error": err.message })
        return;
      }
      res.json({
        "data": rows
      })
    })
  })
}


function amro_trips() {
  app.get("/amro_trips", (req, res) => {
    let sql = `SELECT Id,StatusId FROM amro_trips ORDER BY Id DESC LIMIT 1;`;
    db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({ "error": err.message })
        return;
      }
      res.json({
        "data": rows
      })
    })
  })
}

function floors() {
  app.get("/floors", (req, res) => {
    let sql = `SELECT Name,id FROM  floors`;
    db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({ "error": err.message })
        return;
      }
      res.json({
        "floors": rows
      })
    })
  })
}


function rooms(floorId) {
  app.get("/rooms", (req, res) => {
    let sql = `SELECT rooms.Id,rooms.Name FROM rooms WHERE  FloorId = ?`;
    db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({ "error": err.message })
        return;
      }
      res.json({
        "rooms": rows
      })
    })
  })
}

function get_trip_status(){
  app.get("/amro-state", (req, res) => {
    let sql = (`SELECT * FROM stock WHERE barcode=?`);
    db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({ "error": err.message })
        return;
      }
      res.json({
        "rooms": rows
      })
    })
  })
}

function get_stock_from_barcode(barcode){
  t = (barcode)
  app.get("/rooms", (req, res) => {
    let sql = (`SELECT * FROM stock WHERE barcode=?`,t);
    db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({ "error": err.message })
        return;
      }
      res.json({
        "rooms": rows
      })
    })
  })
}

function get_user_from_pin() {
  app.get("/dispatch", (req, res) => {
    let sql = `select Id,Name from users where Passcode=?`;
    db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({ "error": err.message })
        return;
      }
      res.json({
        "data": rows
      })
    })
  })
}

function set_trip_goal( tripId, roomId){
  p = (roomId,tripId)
  app.patch("/set-goal-xy", (req, res) => {
    let sql = ('UPDATE amro_trips SET RoomId=? where Id=?;', p);
    db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({ "error": err.message })
        return;
      }
      res.json({
        "data": rows
      })
    })
  })
}

function set_trip_goal_xy(tripId, x, y){
  p = (-1, str(x) + "|" + str(y), tripId)
  app.patch("/set-goal-xy", (req, res) => {
    let sql = ('UPDATE amro_trips SET RoomId=?,RoomXY=? where Id=?;', p);
    db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({ "error": err.message })
        return;
      }
      res.json({
        "data": rows
      })
    })
  })
}
function start_amro_trip(userId, tripId){
  tripdata = (userId,30,tripId);
  app.patch("/dispatch", (req, res) => {
    let sql = ('UPDATE amro_trips SET InitiatedBy=?,StatusId=? where Id=?',tripdata);
    db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({ "error": err.message })
        return;
      }
      res.json({
        "data": rows
      })
    })
  })

}

function end_amro_trip(userId, tripId){
  tripdata = (userId,90,tripId)
  app.patch("/delivery", (req, res) => {
    let sql = ('UPDATE amro_trips SET RecievedBy=?,StatusId=? where Id=?;',tripdata);
    db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({ "error": err.message })
        return;
      }
      res.json({
        "data": rows
      })
    })
  })

}

function create_new_trip(){
  amro_trip = (None,datetime.datetime.now(),'','','','','20')
  app.Insert("/delivery", (req, res) => {
    let sql = ('INSERT INTO amro_trips VALUES (?,?,?,?,?,?,?);', amro_trip)
    db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({ "error": err.message })
        return;
      }
      res.json({
        "message": "Success",
        "data": rows
      })
    })
  })
}

function canceldelivery(userId, tripId){
  tripdata = (userId, 120,tripId)
  app.patch("/cancel-delivery", (req, res) => {
    let sql = ('UPDATE amro_trips SET RecievedBy=?,StatusId=? where Id=?;',tripdata)
    db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({ "error": err.message })
        return;
      }
      res.json({
        "data": rows
      })
    })
  })

}

function move(){
  app.get("/move", (req, res) => {
    let sql = 'SELECT X,Y FROM face_tracking ORDER BY Id DESC LIMIT 1;'
    db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({ "error": err.message })
        return;
      }
      res.json({
        "message": "Success",
        "data": rows
      })
    })
})
}


function startPort() {
  const port = process.env.PORT || 8080;
  app.listen(port, () => console.log(`Listening on port ${port}..`));
  declareAllFunctions()
}

startPort()
