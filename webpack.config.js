const path = require('path');

const config = {
  entry: './src/index.ts',
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    path: path.resolve(__dirname, 'dist')
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
      }
    ]
  }
};
module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    config.devtool = 'inline-source-map';
    config.output.filename = 'index.js';
  }
  if (argv.mode === 'production') {
    config.output.filename = 'index.min.js';
  }
  return config;
};