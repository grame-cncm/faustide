const path = require('path');
const { ProvidePlugin } = require('webpack');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const VERSION = require("./src/version");

const config = {
  entry: './src/index.ts',
  resolve: {
    fallback: {
      "fs": false,
      "path": false,
      "url": false,
    },
    extensions: ['.ts', '.js']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    chunkFilename: 'js/[chunkhash].js',
    filename: "index.js"
  },
  devtool: 'source-map',
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
        type: 'asset',
        generator: {
            filename: 'assets/[hash][ext][query]'
        }
      },
    ]
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        exclude: /libfaust-wasm\.js/
      })
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { context: './src/static', from: './', to: './', globOptions: { ignore: ['**/.DS_Store'] } },
        { from: './src/monaco-faust/primitives.lib', to: './' },
        { from: './node_modules/@grame/faustwasm/libfaust-wasm/libfaust-wasm.*', to: './faustwasm/[name][ext]' },
        { from: './node_modules/@shren/faust-ui/dist/index.*', to: './faust-ui/[name][ext]' }
      ]
    }),
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
      cacheId: VERSION + new Date().getTime(),
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
