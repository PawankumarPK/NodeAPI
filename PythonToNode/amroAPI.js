var express = require("express")
var app = express()

const sqlite3 = require('sqlite3').verbose();
// open the database
let db = new sqlite3.Database('sar.db');
//var path = " ";

function declareAllFunctions() {

    device_stats()
    amro_stock()
    face_tracking()
    amro_trips()
    floors()
    rooms()
    users()
}

//Api created
function device_stats() {
  app.get("/device_stats", (req, res) => {
    let sql = `SELECT CreatedOn FROM device_stats`;
    var params = []
    db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({ "error": err.message })
        return;
      }
      res.json({
        "message": "Success",
        "data": rows
      })
    });
  });

}

function amro_stock() {
  app.get("/amro_stock", (req, res) => {
    let sql = `SELECT CreatedOn FROM amro_stock`;
    var params = []
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

function face_tracking() {
  app.get("/face_tracking", (req, res) => {
    let sql = `SELECT CreatedOn FROM face_tracking`;
    var params = []
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


function amro_trips() {
  app.get("/amro_trips", (req, res) => {
    let sql = `SELECT CreatedOn FROM amro_trips`;
    var params = []
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

function floors() {
  app.get("/floors", (req, res) => {
    let sql = `SELECT CreatedOn FROM  floors`;
    var params = []
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


function rooms() {
  app.get("/rooms", (req, res) => {
    let sql = `SELECT CreatedOn FROM  rooms`;
    var params = []
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


function users() {
  app.get("/users", (req, res) => {
    let sql = `SELECT CreatedOn FROM  users`;
    var params = []
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
