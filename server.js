var path = require('path');

//App
var bodyParser = require('body-parser')
var express = require('express');
var app = express();
var port = process.env.PORT || 8080;

//Database
var pg = require('pg');
var models = require('./models/index');

//Express Middleware
app.use('/static', express.static('dist'));
app.use('/img', express.static('img'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Development Server
if(process.env.NODE_ENV !== 'production'){

  //Development Dependencies
  var webpack = require('webpack');
  var webpackDevMiddleware = require('webpack-dev-middleware')
  var webpackHotMiddleware = require('webpack-hot-middleware')
  var config = require('./webpack.dev.config.js')
  var compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler, {
    hot: true,
    log: console.log,
    filename: 'bundle.js',
    stats: {
      colors: true,
    },
    historyApiFallback: true,
    noInfo: false,
    publicPath: config.output.publicPath
  }));

  app.use(webpackHotMiddleware(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    historyApiFallback: true,
    publicPath: config.output.publicPath
  }));
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.post('/api/books', function(req, res) {

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
app.listen(port, function () {
  if(process.env.PORT){
    console.log('Listening on port ' + process.env.PORT);
  } else {
    console.log('API listening on port 8080');
  }
});
