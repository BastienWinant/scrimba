const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  // The entry point file described above
  entry: './src/index.js',
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
    port: 9000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      // title: 'Output Management',
      template: "./src/index.html"
    }),
  ],
  // The location of the build folder described above
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(ttf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    alias: {
      // Utilities: path.resolve(__dirname, 'src/utilities/'),
      // Templates: path.resolve(__dirname, 'src/templates/'),
      Data: path.resolve(__dirname, 'assets/data'),
      Fonts: path.resolve(__dirname, 'assets/fonts'),
      // Images: path.resolve(__dirname, 'assets/images')
      Images: path.resolve(__dirname, 'assets/images')
    },
  },
};