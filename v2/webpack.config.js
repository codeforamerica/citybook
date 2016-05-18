var path    = require('path');
var webpack = require('webpack');

module.exports = {
  context: __dirname,
  entry:  [
    'webpack-dev-server/client?http://127.0.0.1:8080/',
    'webpack/hot/only-dev-server',
    './site/',
    './app/'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[id].bundle.js'
  },
  resolve: {
    modulesDirectories: ['node_modules', 'shared'],
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test:    /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel']
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    proxy: {
      '*': 'http://127.0.0.1:' + (process.env.PORT || 3000)
    },
    host: '127.0.0.1'
  }
};
