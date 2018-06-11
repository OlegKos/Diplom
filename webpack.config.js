var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './src/index.jsx',
  output: { path: __dirname, filename: './public/build.js' },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
    /*rules:[
      {
        test:/\.jsx?$/,
        exclude: /node_modules/,
        use:{
          loader:'babel-loader'
        }
      }
    ]*/
  },
};
