/* eslint strict: 0 */
'use strict';

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const baseConfig = require('./webpack.config.base');
const config = Object.assign({}, baseConfig);

config.devtool = 'source-map';

config.entry = './src/index';

config.output.publicPath = './';

config.module.loaders.push({
  test: /\.css$/,
  loader: ExtractTextPlugin.extract(
    'style-loader',
    'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
  ),
});

config.postcss = function postcss() {
  return [
    require('postcss-modules-values'),
    require('postcss-import'),
    require('postcss-nested'),
    require('postcss-cssnext')({ browsers: ['last 2 versions', 'IE > 10'] }),
  ];
};

config.plugins.push(
  new webpack.optimize.OccurrenceOrderPlugin(true),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
    },
  }),
  new HtmlWebpackPlugin({
    template: 'src/index.html',
    favicon: 'src/assets/favicon.ico',
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true,
    },
    inject: true,
  }),
  new webpack.DefinePlugin({
    __DEV__: false,
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
    },
  }),
  new ExtractTextPlugin('styles.css', { allChunks: true })
);

module.exports = config;
