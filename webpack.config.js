const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
require('dotenv').config();
// const Dotenv = require('dotenv-webpack');

/** @type {import('webpack').Configuration} */
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath:'/'
  },
  mode: 'development',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.(s*)css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: './index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/[name].css',
    }),
    new CopyPlugin({
      patterns: [
        { from: 'public/manifest.json', to: '' },
        { from: 'public/service-worker.js', to: '' },
        { from: 'public/icon.png', to: 'assets' },
      ],
    }),
    new webpack.DefinePlugin({
      'process.env.PAYPAL_CLIENT_PP': JSON.stringify(process.env.PAYPAL_CLIENT_PP),
      'process.env.GOOGLE_MAPS_API_KEY': JSON.stringify(process.env.GOOGLE_MAPS_API_KEY),
		}),
  ],
  devServer: {
    allowedHosts: path.join(__dirname, 'dist'),
    historyApiFallback: true,
    compress: true,
    port: 3005,
  },
};
