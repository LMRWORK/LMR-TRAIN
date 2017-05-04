var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

const config = {

  entry: {
    bundle: path.resolve(__dirname, 'index.js'),
    vendor1: ['react', 'react-dom'],
    vendor2: ['react-redux', 'immutable', 'fecha'],
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: 'assets',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader?presets[]=react,presets[]=es2015,presets[]=stage-1'
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)(\?.*||)/,
        exclude: /node_modules/,
        loader: 'url-loader?importLoaders=1&limit=1&name=/font/[name].[ext]'
  　　},
      {
        test: /\.txt$/,
        exclude: /node_modules/,
        loader: 'url-loader?importLoaders=1&limit=1&name=/data/[name].[ext]'
      }
    ]
  },

  plugins: [

    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.resolve(__dirname, 'src/index.html'),
        hash: true,
        minify:{
            removeComments:true,
            //collapseWhitespace:true /*product*/
        }
    }),

    /* product
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false,  // remove all comments
      },
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    */

    new webpack.optimize.CommonsChunkPlugin({ name: ['vendor1', 'vendor2'], minChunks: 2 }),
    new ExtractTextPlugin('bundle.css'),
  ],

};

module.exports = config;