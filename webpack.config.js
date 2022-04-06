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

const filename = ext => (isDev ? `[name].${ext}` : `[name].[hash].${ext}`);

const cssLoaders = extra => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {},
    },
    'css-loader',
  ];

  if (extra) {
    loaders.push(extra);
  }
  return loaders;
};

const babelOptions = preset => {
  const opts = {
    presets: ['@babel/preset-env'],
    plugins: ['@babel/plugin-proposal-class-properties'],
  };
  if (preset) {
    opts.presets.push(preset);
  }
  return opts;
};

const jsLoaders = () => {
  const loaders = [{ loader: 'babel-loader', options: babelOptions() }];
  if (isDev) {
    loaders.push('eslint-loader');
  }
  return loaders;
};

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    main: ['@babel/polyfill', './index.jsx'],
    //Для отдельно подключаеммых js файлов
    // analytics:'analytics'
  },

  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: '[path]/[name][ext]',
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

  devtool: isDev ? 'source-map' : 'eval',

  plugins: [
    //HTML plugin
    new HtmlWebpackPlugin({
      template: './index.html',
      minify: isProd,
      inject: 'body',
      scriptLoading: 'blocking',
    }),
    //Clear plugin
    new CleanWebpackPlugin(),
    //Copy files plugin
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/webpack.ico'),
          to: path.resolve(__dirname, 'dist'),
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: filename('css'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssLoaders(),
      },
      {
        test: /\.s[ac]ss$/,
        use: cssLoaders('sass-loader'),
      },
      //Loading img
      {
        test: /\.(png|jpg|jpeg|svg|gif)$/,
        type: 'asset/resource',
      },
      //Loading fonts
      {
        test: /\.(ttf|woff|woff2)$/,
        type: 'asset/resource',
      },
      //Loading XML
      {
        test: /\.xml$/,
        use: ['xml-loader'],
      },
      //Loading CSV
      {
        //Установить papaparse
        test: /\.csv$/,
        use: ['csv-loader'],
      },
      //Babel Js
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader', options: babelOptions() },
      },
      //Babel TS
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader', options: babelOptions('@babel/preset-typescript') },
      },

      //Babel React JSX
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader', options: babelOptions('@babel/preset-react') },
      },
    ],
  },
};
