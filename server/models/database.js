var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/citybook';

var client = new pg.Client(connectionString);

client.connect();

var query = client.query('CREATE TABLE book_links(id SERIAL PRIMARY KEY, title VARCHAR(160) not null, link VARCHAR(160) not null, opt_in BOOLEAN)');

query.on('end', function() {
  client.end();
});
