const path = require('path')
const webpack = require('webpack')

module.exports = {
  context: __dirname,
  devtool: 'eval',

  entry: [
    'webpack-hot-middleware/client?path=__webpack_hmr&reload=true',
    path.resolve('./src/index.js')
  ],

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: 'http://localhost:8080/dist/'
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],

  module: {
    loaders: [
      { test: /\.js?$/,
        loader: 'babel',
        exclude: path.join(__dirname, 'node_modules') },
      { test: /\.scss?$/,
        loaders: ['style', 'css', 'sass'],
        include: path.join(__dirname, 'styles') },
      { test: /\.png$/,
        loader: 'file' },
      { test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file'}
    ]
  }
}
