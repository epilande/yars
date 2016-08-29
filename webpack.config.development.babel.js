const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const baseConfig = require('./webpack.config.base');

const config = merge(baseConfig, {
  debug: true,

  devtool: 'eval',

  entry: './src/index',

  output: {
    publicPath: '/',
  },

  devServer: {
    hot: true,
    inline: true,
    progress: true,
    contentBase: './dist',
    stats: { colors: true },
  },

  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss-loader',
        ],
      },
    ],
  },

  postcss: function() {
    return [
      require('stylelint'),
      require('postcss-nested'),
      require('postcss-cssnext')({ browsers: ['last 2 versions', 'IE > 10'] }),
      require('postcss-reporter')({ clearMessages: true }),
    ];
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      favicon: 'src/assets/favicon.ico',
      inject: true,
    }),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      __DEV__: true,
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
    new DashboardPlugin(),
  ],
});

module.exports = config;
