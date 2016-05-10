var express = require('express');
var router = express.Router();
var pg = require('pg');
var path = require("path");
var connectionString = require(path.join(__dirname, '../', 'config'));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'CityBook' });
});

router.post('/api/v1/books', function(req, res) {

    var results = [];

    // Grab data from http request
    var data = {
      title: req.body.title,
      link: req.body.link,
      opt_in: req.body.opt_in
    };
    console.log(data);
    if(data.title.length && data.title.link){

      if(data.title.length > 160){
        return res.status(400).json({success: false, message: "Title exceedes the maxiumum character limit of 160."});
      }

      if(data.link.length > 160) {
        return res.status(400).json({success: false, message: "Link exceedes the maxiumum character limit of 160."});
      }

    } else {
      return res.status(400).json({success: false, message: "Both link and title are required."});
    }

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Insert Data
        client.query("INSERT INTO book_links(title, link, opt_in) values($1, $2, $3)", [data.title, data.link, data.opt_in]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM book_links ORDER BY id ASC");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.status(201).json(results);
        });


    });
});


module.exports = router;
