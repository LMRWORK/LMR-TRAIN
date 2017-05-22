var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

const config = {

  entry: {
    bundle: path.resolve(__dirname, 'index.js'),
    vendor1: ['react', 'react-dom', 'react-redux', 'react-router-dom', 'immutable', 'es6-promise', 'rc-queue-anim'],
    vendor2: ['moment', 'query-string'],
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
        loader: 'url-loader?importLoaders=1&limit=1&name=/public/font/[name].[ext]?[hash]'
  　　},
      {
        test: /\.txt/,
        loader: 'url-loader?importLoaders=1&limit=1&name=/public/data/[name].[ext]?[hash]'
      },
      {
        test: /\.png/,
        loader: 'url-loader?importLoaders=1&limit=1&name=/public/img/[name].[ext]?[hash]'
      },
      {
        test: /\.svg/,
        loader: 'svg-sprite-loader',
        include: [require.resolve('antd-mobile').replace(/warn\.js$/, ''), path.resolve(__dirname, 'src/resources/svg')]
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

    //开发使用生产模式，忽略react的warning。（warning是来自antd的bug）
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"production"'
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