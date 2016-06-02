var path = require('path');

//App
var bodyParser = require('body-parser')
var express = require('express');
var app = express();

//Database
var pg = require('pg');
var models = require('./models/index');

//Express Middleware
app.use('/static', express.static('dist'));
app.use('/img', express.static('img'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Development Server
if(process.argv[2] === '--dev'){

  //Development Dependencies
  var webpack = require('webpack');
  var WebpackDevServer = require('webpack-dev-server');
  var config = require('./webpack.config');

  console.log('dev!');
  new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true
  }).listen(2000, 'localhost', function (err, result) {
    if (err) {
      return console.log(err);
    }
    console.log('Webpack Dev Server Listening at http://localhost:2000/');
  });

} else {
  //Serve static HTML in production
  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname+'/index.html'));
  });

}

app.post('/api/books', function(req, res) {

    // Grab data from http request
    var data = {
      title: req.body.title,
      link: req.body.link,
      opt_in: req.body.opt_in
    };

    if(req.body.title && req.body.link){

      if(req.body.title.length > 160){
        return res.status(400).json({success: false, message: 'Title exceedes the maxiumum character limit of 160.'});
      }

      if(req.body.link.length > 160) {
        return res.status(400).json({success: false, message: 'Link exceedes the maxiumum character limit of 160.'});
      }

    } else {
      return res.status(400).json({success: false, message: 'Both link and title are required.'});
    }

    models.BookReferences.create({
      title: req.body.title,
      link: req.body.link,
      opt_in: req.body.opt_in
    }).then(function(book) {
      res.json(book);
    });

});

//Start Main Server
app.listen(3000, function () {
  console.log('API listening on port 3000');
});
