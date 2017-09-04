var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
    entry: './src/app.js',
    output: {
      path: __dirname + "/dist/",
      filename: 'app.bundle.js'
    },

    devServer: {
      contentBase: "./src",
      hot: true
    },

    module:{
      rules:[
        {test: /\.(js|jsx)$/,
         exclude: /node_modules/,
         use: ['babel-loader']},

        {test: /\.json$/,
        exclude: /node_modules/,
        use: 'file-loader'},

        {test: /\.(png|jpg)$/,
         use: 'url-loader'},

        {test:/\.scss$/,
        use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: ['css-loader', 'sass-loader'],
                publicPath: "/dist/"
          })
        }
      ],
    },
      plugins: [
        new HtmlWebpackPlugin({
            title: 'Pulselive test',
            minify:{
              collapseWhitespace: true
            },
            hash: true,
            template: './src/index.html',
          }),

        new ExtractTextPlugin({
            filename: "app.css",
            disable: false,
            allChunks: true
          }),

        new CopyWebpackPlugin([
              { from: 'src' }
          ])
      ]
}
