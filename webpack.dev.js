const path = require("path");
const express = require("express");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/client/index.js",
  mode: "development",
  devtool: "source-map",
  stats: "verbose",
  output: {
    libraryTarget: "var",
    library: "Client"
  },
  module: {
    rules: [
      {
        test: "/.js$/",
        exclude: "/node_modules/",
        loader: "babel-loader"
      },
      {
        test: "/.scss$/",
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/client/views/index.html",
      filename: "./index.html"
    })
  ]
};
