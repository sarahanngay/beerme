var pg = require('ps');

function start () {
  var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/beerme';

  var client = new pg.Client(connectionString);
  client.connect();
  var query = client.query('CREATE TABLE beers(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)');
  query.on('end', function() { client.end(); });
}

module.exports = {
  start: start
}
