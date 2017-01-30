const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const baseConfig = require('./webpack.config.base');

// PostCSS
const stylelint = require('stylelint');
const postcssImport = require('postcss-import');
const postcssNested = require('postcss-nested');
const cssnext = require('postcss-cssnext');
const postcssReporter = require('postcss-reporter');

const config = merge(baseConfig, {
  devtool: 'eval',

  entry: './src/index',

  output: {
    publicPath: '/',
  },

  devServer: {
    hot: true,
    inline: true,
    contentBase: './dist',
    stats: { colors: true },
  },

  module: {
    rules: [
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

  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: (webpackInstance) => [
          stylelint,
          postcssImport({
            path: ['./src'],
          }),
          postcssNested,
          cssnext({ browsers: ['last 2 versions', 'IE > 10'] }),
          postcssReporter({ clearMessages: true }),
        ],
        context: __dirname,
      },
      debug: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      favicon: 'src/assets/favicon.ico',
      inject: true,
    }),
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
