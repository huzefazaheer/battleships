// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'production', 

  entry: './src/game.js',


  output: {
    filename: 'main.js', // The name of your bundled JavaScript file
    path: path.resolve(__dirname, 'dist'), // The output directory
    clean: true, // Cleans the 'dist' folder before each build (Webpack 5 feature)
  },

  plugins: [new HtmlWebpackPlugin({template:"./src/index.html"})],

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};