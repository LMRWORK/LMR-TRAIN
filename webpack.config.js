var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

const svgDirs = [
  require.resolve('antd-mobile').replace(/warn\.js$/, '')
];

const config = {

  entry: {
    bundle: path.resolve(__dirname, 'index.js'),
    vendor1: ['react', 'react-dom', 'react-redux'],
    vendor2: ['immutable'],
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: 'assets',
  },

  resolve: {
    modules: ['node_modules', path.join(__dirname, '../node_modules')],
    extensions: ['.web.js', '.js', '.json']
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader?presets[]=react,presets[]=es2015,presets[]=stage-1'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
      },
      {
        test: /\.(woff|woff2|eot|ttf)/,
        loader: 'url-loader?importLoaders=1&limit=1&name=/font/[name].[ext]'
  　　},
      {
        test: /\.txt/,
        loader: 'url-loader?importLoaders=1&limit=1&name=/data/[name].[ext]'
      },
      {
        test: /\.(svg)$/i,
        loader: 'svg-sprite-loader',
        include: svgDirs
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
    //new webpack.EnvironmentPlugin(['NODE_ENV']),

    new webpack.optimize.CommonsChunkPlugin({ name: ['vendor1', 'vendor2'], minChunks: 2 }),
    new ExtractTextPlugin('bundle.css'),
  ],

};

module.exports = config;