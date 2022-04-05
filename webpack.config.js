const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all',
    },
  };

  if (isProd) {
    config.minimizer = [new OptimizeCssAssetsPlugin(), new TerserPlugin()];
  }
  return config;
};

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    main: './index.js',
    analytics: './analytics.js',
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    // assetModuleFilename: '[path]/[name][ext]',
  },
  optimization: optimization(),
  resolve: {
    extensions: ['.js', '.json', '.png', '.svg', '.jpg', '.jpeg'],
    alias: {},
  },
  devServer: {
    port: 4200,
    hot: isDev,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      minify: isProd,
      inject: 'body',
      scriptLoading: 'blocking',
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/webpack.ico'),
          to: path.resolve(__dirname, 'dist'),
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },
          'css-loader',
        ],
      },
      {
        test: /\.(png|jpg|jpeg|svg|gif)$/,
        type: 'asset/resource',
        // options: { name: [`[path][name][ext]`] },
      },

      {
        test: /\.(ttf|woff|woff2)$/,
        type: 'asset/resource',
      },
      {
        test: /\.xml$/,
        use: ['xml-loader'],
      },
      {
        //Установить papaparse
        test: /\.csv$/,
        use: ['csv-loader'],
      },
    ],
  },
};
