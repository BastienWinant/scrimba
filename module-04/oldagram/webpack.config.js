const path = require('path');

module.exports = {
  mode: 'development',
  // The entry point file described above
  entry: './src/index.js',
  // The location of the build folder described above
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    alias: {
      "js": path.resolve(__dirname, "src/js"),
      "css": path.resolve(__dirname, "src/css"),
      "templates": path.resolve(__dirname, "src/templates"),
      "assets": path.resolve(__dirname, "assets")
    }
  },
  // Optional and for development only. This provides the ability to
  // map the built code back to the original source format when debugging.
  devtool: 'eval-source-map',
};