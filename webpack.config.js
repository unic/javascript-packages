const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const baseConfig = {
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
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false,
        },
        comments: false,
      },
    }),
    new webpack.LoaderOptionsPlugin({
      debug: true,
    }),
  ],
};

module.exports = baseConfig;
