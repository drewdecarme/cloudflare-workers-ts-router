const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = {
  mode: "production",
  output: {
    filename: `worker.prod.js`,
    path: path.join(__dirname, "../dist"),
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    plugins: [],
  },
  plugins: [new Dotenv()],
  module: {
    rules: [
      {
        test: /\.(tsx|ts)?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
    ],
  },
};
