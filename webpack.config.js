var path = require("path");
module.exports = {
  entry: "./src/cascader/index.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "index.js",
    libraryTarget: "commonjs2"
  },
  module: {
    rules: [
      {
        test: /\.js$/,        
        include: path.resolve(__dirname, "src"),
        exclude: /(node_modules|bower_components|build)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env", "es2015"]
          }
        }
      },{
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      }
    ]
  },
  externals: {
    react: "commonjs react"
  }
};
