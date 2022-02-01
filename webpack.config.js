const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  mode: 'production',
  entry: './src/app.js',
  output: {
    filename: 'tv-app.js', // '[name].[contenthash].bundle.js',
    libraryTarget: 'system',
    path: path.resolve(__dirname, 'build', process.env.OUTDIR || ''),
    publicPath: '/'
  },
  externals: ['react', 'react-dom', '@tbiegner99/home-automation-components'],
  devServer: {
    hot: true,
    host: '0.0.0.0',
    port: 8004,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    },

    historyApiFallback: true
  },

  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      /* {
        test: /\.svg$/,
        include: [path.resolve(__dirname, 'node_modules/@fortawesome/fontawesome-free/svgs')],
        use: ['@svgr/webpack']
      }, */
      {
        test: /\.(png|jpe?g|svg|gif|eot|woff2?|ttf)$/i,
        exclude: [path.resolve(__dirname, 'node_modules/@fortawesome/fontawesome-free/svgs')],
        use: [
          {
            loader: 'file-loader'
          }
        ]
      },
      {
        test: /\.html?$/i,
        use: ['html-loader']
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[path][name]__[local]'
              }
            }
          }
        ]
      }
    ]
  }
};
