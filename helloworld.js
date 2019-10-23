var server = require('http');

// current timestamp in milliseconds
let ts = Date.now();
let date_ob = new Date(ts);
let date = date_ob.getDate();
let month = date_ob.getMonth() + 1;
let year = date_ob.getFullYear();
let hour = date_ob.getHours();
let min = date_ob.getMinutes();
let sec = date_ob.getSeconds()

server.createServer(engine).listen(1337);
function engine(request,response){
    response.writeHead(200,{'Content-Type': 'text/plain '});
    // prints date & time in YYYY-MM-DD format
    console.log(year + "-" + month + "-" + date + "---" + hour + "-" + min + "-" + sec);
    response.end(year + "-" + month + "-" + date + "---" + hour + "-" + min + "-" + sec)
}   