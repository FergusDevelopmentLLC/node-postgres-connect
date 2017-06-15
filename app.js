var pg = require('pg');
var os = require('os');

var port = 5432;

console.log(os.hostname());
console.log(os.type());

var hostname = os.hostname();

if(hostname != "geodev")//node is being run on host, use the port forward
  port = 15432;

var conString = "postgres://geodevdb:admin123@127.0.01:" + port + "/geodevdb";

//this initializes a connection pool
//it will keep idle connections open for a (configurable) 30 seconds
//and set a limit of 10 (also configurable)
pg.connect(conString, function(err, client, done) {
  if(err) {
    return console.error('error fetching client from pool', err);
  }
  client.query('SELECT $1::int AS number', ['1'], function(err, result) {
    //call `done()` to release the client back to the pool
    done();

    if(err) {
      return console.error('error running query', err);
    }
    console.log(result.rows[0].number);
    //output: 1
  });
});
