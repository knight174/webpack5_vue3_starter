const { resolve } = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const { DefinePlugin } = require('webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// __dirname: D:\my_reps\webpack5_vue3_starter\build

const commonConfig = {
  entry: './src/main.ts',
  output: {
    filename: 'js/[name].[contenthash:6].js',
    assetModuleFilename: 'assets/[name]_[hash][ext]',
    path: resolve(__dirname, '../dist'),
    clean: true
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': resolve(__dirname, '../src')
    }
  },
  module: {
    rules: [
      {
          test: /\.vue$/,
          exclude: /node_modules/,
          use: 'vue-loader',
      },
      {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
              {
                  loader: 'ts-loader',
                  options: { appendTsSuffixTo: [/\.vue$/] }, // 这个很关键，不可删除
              }
          ],
      },
      {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
              loader: 'babel-loader'
          }
      },
      {
          test: /\.s?css$/,
          exclude: /node_modules/,
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader", "postcss-loader"],
      },
      {
          test: /\.(jpe?g|png|gif|svg|bmp|tiff)$/,
          exclude: /node_modules/,
          type: "asset",
          generator: {
              filename: 'assets/images/[name]_[hash][ext]',
          },
          parser: {
              dataUrlCondition: {
                  maxSize: 8 * 1024
              }
          },
      },
      {
          test: /\.(otf|eot|woff2?|ttf|svg)$/,
          exclude: /node_modules/,
          type: "asset",
          generator: {
              filename: 'assets/fonts/[name]_[hash][ext]',
          }
      },
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './index.html',
      favicon: resolve(__dirname, '../public/favicon.ico')
    }),
    new DefinePlugin({
      __VUE_PROD_DEVTOOLS__: false,
      __VUE_OPTIONS_API__: true,
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin()
  ]
};

module.exports = commonConfig;
