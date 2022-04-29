const path = require('path');

const config = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "babel-loader",
        options: {
          presets: ["babel-preset-react-app"]
        }
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx"]
  }
}

module.exports = config
