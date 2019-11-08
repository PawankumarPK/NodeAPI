var express = require("express")
var app = express()

const sqlite3 = require('sqlite3').verbose();
// open the database
let db = new sqlite3.Database('sar.db');
var params = []
var i;

function declareAllFunctions() {


  get_device_stats()
  get_face_xy()
  get_floors()
  get_rooms()
  get_user_from_pin()
  get_stock_from_tripId()
  get_floor_and_rooms()
  get_trip_status()
  get_stock_from_barcode()
  get_user_from_pin()
  set_trip_goal()
  move()
}

//Api created

function get_stock_from_tripId(tripId) {
  t = (tripId)
  app.get("/amro_stock", (req, res) => {

    // tripId = -1
    // if (tripId != -1) {
    //   ('tripid' in params)
    // } else params['tripid'][0]

    let sql = ('SELECT stock.Id,stock.Name,amro_stock.Quantity,TripId FROM amro_stock LEFT JOIN stock ON stock.Id=amro_stock.StockId WHERE TripId=?');
    db.get(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({ "error": err.message })
        return;
      }
      res.json({
        "amroStock": rows
      })
    });
  });

}

function get_floor_and_rooms(data) {

  app.get("/floors-rooms", (req, res) => {
    let sql = `SELECT rooms.Id,rooms.Name,floors.Id,floors.Name FROM rooms 
    LEFT JOIN floors ON floors.Id=rooms.FloorId`;
    db.all(sql, params, (err, rows) => {
      console.log(rows);

      if (err) {
        res.status(400).json({ "error": err.message })
        return;
      }
      res.json({

        "floorsRooms": rows,

        for(i = xrange(0, len(data))) {
         var floorId = data[i][2]
          if (floorId != floors)
            floors[floorId] = {
              "floorId": floorId,
              "floorName": data[i][3],
              "floorRooms": []
            }
          floors[floorId]["floorRooms"].append({
            "roomId": data[i][0],
            "roomName": data[i][1]
          })
          return { "floors": floors.values() }
        }
      })
    })
  })

}



//
function get_floors() {
  app.get("/floors", (req, res) => {
    let sql = `SELECT floors.Id,floors.Name FROM  floors`;
    db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({ "error": err.message })
        return;
      }
      res.json({
        "floors": rows,
        floorData
      })
    })
  })
}

function get_rooms(floorId) {
  app.get("/rooms", (req, res) => {

    floorId = -1
    if (floorId != -1) { ('floorId' in params) } else params['floorId'][0]

    let sql = (`SELECT rooms.Id,rooms.Name FROM rooms WHERE  FloorId = ?`, floorId);
    db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({ "error": err.message })
        return;
      }
      res.json({
        //"rooms": rows,
        roomData
      })
    })
  })
}

function get_trip_status() {
  app.get("/amro-state", (req, res) => {
    let sql = (`SELECT Id,StatusId FROM amro_trips ORDER BY Id DESC LIMIT 1;`);
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

//Not in use
function get_stock_from_barcode(barcode) {
  t = (barcode)
  app.get("/rooms", (req, res) => {
    let sql = (`SELECT * FROM stock WHERE barcode=?`, t);
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

    // pin = -1 if not ('pin' in params) else params['pin'][0] 
    //   tripId = -1 if not ('tripid' in params) else params['tripid'][0] 


    let sql = (`select Id,Name from users where Passcode=?`);
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


function get_device_stats() {
  app.get("/device_stats", (req, res) => {
    let sql = (`SELECT Name,Value FROM device_stats`);

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

function get_face_xy() {
  app.get("/face-xy", (req, res) => {
    let sql = `SELECT X,Y FROM face_tracking ORDER BY Id DESC LIMIT 1 `;
    db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({ "error": err.message })
        return;
      }
      res.json({
        "face": rows
      })
    })
  })
}

//this one
function set_trip_goal(tripId, roomId) {
  p = (roomId, tripId)
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

function set_trip_goal_xy(tripId, x, y) {
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

//this one
function start_amro_trip(userId, tripId) {
  tripdata = (userId, 30, tripId);
  app.patch("/dispatch", (req, res) => {
    let sql = ('UPDATE amro_trips SET InitiatedBy=?,StatusId=? where Id=?', tripdata);
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

//this one
function end_amro_trip(userId, tripId) {
  tripdata = (userId, 90, tripId)
  app.patch("/delivery", (req, res) => {
    let sql = ('UPDATE amro_trips SET RecievedBy=?,StatusId=? where Id=?;', tripdata);
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

function create_new_trip() {
  amro_trip = (None, datetime.datetime.now(), '', '', '', '', '20')
  app.Insert("/newtrip", (req, res) => {
    let sql = ('INSERT INTO amro_trips VALUES (?,?,?,?,?,?,?);', amro_trip)
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

//this one
function canceldelivery(userId, tripId) {
  tripdata = (userId, 120, tripId)
  app.patch("/cancel-delivery", (req, res) => {
    let sql = ('UPDATE amro_trips SET RecievedBy=?,StatusId=? where Id=?;', tripdata)
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

function move() {
  app.get("/move", (req, res) => {
    let sql = 'SELECT X,Y FROM face_tracking ORDER BY Id DESC LIMIT 1;'
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

function floorData(data) {
  var floors = []
  for (i = xrange(0, len(data));
    floor = {
      "floorId": data[i][0],
      "floorName": data[i][1]
    };

    floors.append(floor)
  )
    return { "floors": floors }
}

function roomData(data) {
  rooms = []
  for (i in xrange(0, len(data))) {
    rooms.append({
      "roomId": data[i][0],
      "roomName": data[i][1]
    })
  }
  return { "rooms": rooms }
}


function startPort() {
  const port = process.env.PORT || 8080;
  app.listen(port, () => console.log(`Listening on port ${port}..`));
  declareAllFunctions()
}

startPort()
