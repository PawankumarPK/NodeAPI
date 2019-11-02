var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')
var db;

const DBSOURCE = "db.sqlite"

function createDB(){
    console.log("createDb SQLITE DB");
    db = new sqlite3.Database(DBSOURCE,createTable);

}

function createTable(){

    console.log('Connected to the SQLITE DB');
        db.run(`CREATE TABLE user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text, 
            email text UNIQUE, 
            password text, 
            CONSTRAINT email_unique UNIQUE (email) )`,insertRows)
        
}


function insertRows(){
        //Table just created, creating some rows
        var insert = 'INSERT INTO user (name,email,password) VALUES(?,?,?)'
        db.run(insert,["admin","admin@example.com",md5("admin123456")])
        db.run(insert,["user","user@example.com",md5("user123456")])
        db.run(insert,["pawan","pawan@example.com",md5("pawan123456")])
        db.run(insert,["yadav","yadav@example.com",md5("yadav123456")])

    }



// let db = new sqlite3.Database(DBSOURCE,(err) =>{
//     if(err){
//         //Cannot open database
//         console.err(err.message)
//         throw err
//     }else{
//         console.log('Connected to the SQLITE DB');
//         db.run(`CREATE TABLE user (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             name text, 
//             email text UNIQUE, 
//             password text, 
//             CONSTRAINT email_unique UNIQUE (email)
//             )`,
//         (err) => {
//             if (err) {
//                 //Table already created
//             }else{
//                 //Table just created, creating some rows
//                 var insert = 'INSERT INTO user (name,email,password) VALUES(?,?,?)'
//                 db.run(insert,["admin","admin@example.com",md5("admin123456")])
//                 db.run(insert,["user","user@example.com",md5("user123456")])
//                 db.run(insert,["pawan","pawan@example.com",md5("pawan123456")])
//                 db.run(insert,["yadav","yadav@example.com",md5("yadav123456")])

//             }

//         });
//     }

// });
createDB()
module.exports = db