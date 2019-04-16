const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
require("dotenv").config();
const webpack = require('webpack');

module.exports = (env) =>  {

const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
}, {});

return {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "[name].bundle.js",
    publicPath: '/'
  },
  devServer: {
      historyApiFallback: true
    },
  module: {
    rules: [
      {
        test: /\.css$/, use: ["style-loader", "css-loader"]
      },
      {
        test: /\.js$/, exclude: /node_modules/, use: ["babel-loader"]
      },      
      {
        test: /\.(png|jpe?g|svg|gif)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              disable: true,
              bypassOnDebug: true,               
            },
          },
        ],
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: "./src/index.html"}),
    new webpack.DefinePlugin(envKeys)
  ]
}
};