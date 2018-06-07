'use strict'

const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  context: path.resolve(__dirname, '..'),
  entry: './source/application/index.js',
  module: {
    rules: [{
      exclude: /node_modules/,
      test: /\.js$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [['env', {
            targets: {
              chrome: 54,
              firefox: 50,
              safari: 10
            }
          }], 'react']
        }
      }
    }]
  },
  output: {
    path: path.resolve(__dirname, '../release')
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: './source/index.html'
    })
  ]
}
