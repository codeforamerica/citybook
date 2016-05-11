var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/citybook';

var client = new pg.Client(connectionString);

client.connect();

var query = client.query(
  'CREATE TABLE citybooks_list(id SERIAL PRIMARY KEY, title VARCHAR(160) not null, link VARCHAR(160) not null, email VARCHAR(160) not null, location VARCHAR(160), opt_in BOOLEAN)');

query.on('end', function() {
  client.end();
});
