const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
const { NetlifyPlugin } = require("netlify-webpack-plugin");

module.exports = {
  entry: {
    main: "./src/index.tsx",
    styles: "./src/styles/index.scss",
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
    clean: true,
  },
  module: {
    rules: [
      { test: /\.tsx?$/i, loader: "babel-loader" },
      {
        test: /\.s?css$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(jpe?g|png|gif|svg|icon)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
     title: "Trivia",
     template: "./public/index.html" 
    }),
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
    new NetlifyPlugin({
      redirects: [
        {
          from: "/*",
          to: "/index.html",
          status: 200,
        },
      ],
    }),
    ],
  devServer: {
    port: 3000,
    open: true,
    historyApiFallback: true,
  },
};
