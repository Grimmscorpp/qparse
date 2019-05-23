const path = require("path");

module.exports = [
  {
    mode: "none",
    entry: path.resolve(__dirname, "src", "index.js"),
    output: {
      filename: "qparse.js",
      path: path.resolve(__dirname, "dist")
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ]
    }
  },
  {
    mode: "production",
    entry: path.resolve(__dirname, "src", "index.js"),
    output: {
      filename: "qparse.min.js",
      path: path.resolve(__dirname, "dist")
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ]
    }
  }
];
