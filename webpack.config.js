const path = require('path');
const webpack = require('webpack');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

const config = {
  entry: './src/index.ts',
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    chunkFilename: 'js/[chunkhash].js'
  },
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
    new MonacoWebpackPlugin({
      output: 'js',
      languages: []
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.$': 'jquery',
      'window.jQuery': 'jquery'
    }),
    new WorkboxPlugin.GenerateSW({
      // these options encourage the ServiceWorkers to get in there fast
      // and not allow any straggling "old" SWs to hang around
      clientsClaim: true,
      skipWaiting: true,
      maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
      cacheId: "1.0.6",
      globDirectory: 'dist/',
      globPatterns: ['./examples/**/*', './faust-ui*', './libfaust-wasm*', './index.html', './favicon.png', './icon/*', './02-XYLO1.mp3', './primitives.lib', './examples.json', './manifest.json']
    })
  ]
};
module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    config.devtool = 'source-map';
    config.output.filename = 'index.js';
  }
  if (argv.mode === 'production') {
    config.devtool = 'source-map';
    config.output.filename = 'index.min.js';
  }
  return config;
};