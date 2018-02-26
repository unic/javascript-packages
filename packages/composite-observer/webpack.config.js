const webpack = require('webpack');
const path = require('path');

const config = {
  entry: './src/index.js',
  output: {
    library: 'observer',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'dist'),
    filename: 'observer.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      comments: false,
    }),
    new webpack.LoaderOptionsPlugin({
      debug: true,
    }),
  ],
};

module.exports = config;
