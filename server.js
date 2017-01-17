var path = require('path');

//App
var bodyParser = require('body-parser')
var express = require('express');
var app = express();

//Express Middleware
app.use('/static', express.static('dist'));
app.use('/img', express.static('img'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', require('./routes'))

//Development Server
if(process.argv[2] === '--dev'){
  //Development Dependencies
  var webpack = require('webpack');
  var WebpackDevServer = require('webpack-dev-server');
  var config = require('./webpack.config');

  new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    proxy: {
      '/api*': {
        target: 'http://localhost:8080/',
        secure: false
      }
    }
  }).listen(3000, 'localhost', function (err, result) {
    if (err) {
      return console.log(err);
    }
    console.log('Webpack Dev Server Listening at http://localhost:3000/');
  });

}

// Redirect to HTTPS if not running in dev
if(process.argv[2] !== '--dev'){
  app.get('*',function(req,res,next){
    if(req.headers['x-forwarded-proto']!='https')
      res.redirect('https://www.citybook.io' + req.url)
    else
      next()
  })
}

//Serve static HTML in production
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/index.html'));
});

// Serve serviceworker from top-level directory
app.get('/sw.js', function (req, res) {
  res.sendFile(path.join(__dirname+'/sw.js'));
});

app.get('/manifest.json', function (req, res) {
  res.sendFile(path.join(__dirname+'/manifest.json'));
});

//Start Main Server
app.listen(process.env.PORT || 8080, function () {
  if(process.env.PORT){
    console.log('Listening on port ' + process.env.PORT);
  } else {
    console.log('API listening on port 8080');
  }
});
