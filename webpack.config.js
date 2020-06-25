const path = require('path');
const { ProvidePlugin } = require('webpack');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VERSION = require("./src/version");

const config = {
  entry: './src/index.ts',
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    chunkFilename: 'js/[chunkhash].js',
    filename: "index.js"
  },
  devtool: 'source-map',
  node: {
    fs: 'empty'
  },
  module: {
    rules: [{
        test: /\.(ts|js)x?$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.wasm$/,
        loader: 'url-loader',
        type: 'javascript/auto',
        exclude: /node_modules/,
        options: {
          mimetype: 'application/wasm'
        }
      },
      {
        test: /\.s[ac]ss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        use: [ 
          {
            loader: 'file-loader',
            options: {
              outputPath: 'assets/',
              publicPath: 'assets/'
            }
          }
        ]
      },
      {
        test: /\.js$/,
        use: ["source-map-loader"],
        include: /faust2webaudio/,
        enforce: "pre"
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      { from: './src/static', to: './', globOptions: { ignore: ['**/.DS_Store'] } },
      { from: './src/monaco-faust/primitives.lib', to: './' },
      { from: './node_modules/faust2webaudio/dist/libfaust-wasm.*', to: './', flatten: true },
      { from: './node_modules/faust-ui/dist/faust-ui.*', to: './', flatten: true },
      { from: './node_modules/faust-ui/dist/index.html', to: './faust-ui.html', flatten: true }
    ]),
    new MonacoWebpackPlugin({
      output: 'js',
      languages: []
    }),
    new ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.$': 'jquery',
      'window.jQuery': 'jquery'
    }),
    new WorkboxWebpackPlugin.GenerateSW({
      cacheId: VERSION,
      cleanupOutdatedCaches: true,
      clientsClaim: true,
      skipWaiting: true,
      maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
    })
  ]
};
module.exports = config;
/* 
module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    config.devtool = 'source-map';
    config.output.filename = 'index.js';
  }
  if (argv.mode === 'production') {
    config.devtool = 'source-map';
    config.output.filename = 'index.js';
  }
  return config;
};
*/