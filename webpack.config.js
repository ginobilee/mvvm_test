// webpack.config.js
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin') //installed via npm

var webpack = require('webpack')
var path = require('path')
const fs = require('fs')

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)

module.exports = {
  entry: ['./src/index.js'], //演示单入口文件
  output: {
    path: path.join(__dirname, 'build'), //打包输出的路径
    filename: 'index.js', //打包后的名字
    publicPath: path.join(__dirname, 'build') //html引用文件的路径，在这里是本地地址。
  },
  devtool: 'source-map',
  devServer: {
    port: 8000,
    overlay: true,
    hot: true,
    inline: true,
    contentBase: path.join(__dirname, 'build'),
    publicPath: 'http://localhost:3000/build/'
  },
  module: {
    rules: [
      {
        test: '/.js$/',
        include: '/src',
        use: [
          {
            loader: 'babel-loader',
            query: {
              presets: ['es2015', 'stage-0']
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['build/*.js']),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({ template: './build/index.html' })
  ]
}
