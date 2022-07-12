const { resolve } = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const { DefinePlugin } = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
// element plus 自动加载
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

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
    extensions: ['.ts', '.js'],
    alias: {
      '@': resolve(__dirname, '../src')
    }
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: 4 // 是否并⾏打包（开 4 核）
      })
    ]
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.([jt]sx?)?$/,
        exclude: /node_modules/,
        use: {
          loader: 'swc-loader',
          options: {
            jsc: {
              parser: {
                syntax: 'typescript'
              }
            }
          }
        }
      },
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              additionalData: `
                @import "~@/style/_var.scss";
              `
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg|bmp|tiff)$/,
        exclude: /node_modules/,
        type: 'asset',
        generator: {
          filename: 'assets/images/[name]_[hash][ext]'
        },
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024
          }
        }
      },
      {
        test: /\.(otf|eot|woff2?|ttf|svg)$/,
        exclude: /node_modules/,
        type: 'asset',
        generator: {
          filename: 'assets/fonts/[name]_[hash][ext]'
        }
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './index.html',
      favicon: resolve(__dirname, '../public/favicon.ico')
    }),
    new DefinePlugin({
      __VUE_PROD_DEVTOOLS__: false,
      __VUE_OPTIONS_API__: true
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'style/[name].[contenthash:6].css'
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ]
}

module.exports = commonConfig
