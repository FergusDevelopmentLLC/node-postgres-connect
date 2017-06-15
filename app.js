var os = require('os');

var hostname = os.hostname();
var type = os.type();

//display the host computer name
console.log('os.hostname(): ' + os.hostname());
//display the os type (Linux, Windows, etc.)
console.log('os.type(): ' + os.type());
console.log();

//node is not being run locally.
//port 15432 on the host is forwarded to 5432 on the vm
var port = 5432;
if (hostname !== "geodev") { port = 15432; }

var conString = "postgres://geodevdb:admin123@127.0.01:" + port + "/geodevdb";

console.log('conString: ' + conString);

var pg = require('pg');
var client = new pg.Client(conString);

client.connect();

var query = "SELECT * FROM weather;";
console.log("SQL query on geodevdb: " + query);

var query = client.query(query);

query.on('row', function (row) {
    console.log(row);
});

query.on('end', function () {
    client.end();
});
