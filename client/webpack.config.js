const path = require('path')

const HtmlPlugin = require('html-webpack-plugin')

const isProduction = process.env.NODE_ENV === 'production'
const outputPath = path.join(__dirname, '../dist/client')

module.exports = {
  mode: isProduction ? 'production' : 'development',
  devtool: isProduction ? 'source-map' : 'eval-source-map',
  entry: {
    app: ['react-hot-loader/patch', path.join(__dirname, 'app.tsx')],
  },
  output: {
    path: outputPath,
    filename: isProduction ? '[name].[contenthash].js' : '[name].js',
    publicPath: '/',
  },
  resolve: {
    alias: {
      'react-dom': isProduction ? 'react-dom' : '@hot-loader/react-dom',
    },
    extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'],
  },
  plugins: [
    new HtmlPlugin({
      template: path.join(__dirname, 'index.html'),
      inject: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(t|j)sx?/,
        use: 'babel-loader',
      },
    ],
  },
}
