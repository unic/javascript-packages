const path = require('path');
const baseConfig = require('../../webpack.config');

const config = {
  entry: './src/index.js',
  output: {
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'dist'),
    filename: 'observer.js',
  },
};

module.exports = Object.assign({}, baseConfig, config);
