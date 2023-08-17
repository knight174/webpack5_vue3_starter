const { resolve } = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
// vue
const { VueLoaderPlugin } = require('vue-loader')
const { DefinePlugin } = require('webpack')
// esbuild 构建优化
const { EsbuildPlugin } = require('esbuild-loader')
// css
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 打包优化
const TerserPlugin = require('terser-webpack-plugin')
// element plus 自动加载
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

const commonConfig = {
  entry: './src/main.ts',
  output: {
    filename: 'js/[name].[contenthash:6].js',
    assetModuleFilename: 'assets/[name]_[hash][ext]',
    path: resolve(__dirname, '../dist'),
    clean: true
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@': resolve(__dirname, '../src')
    }
  },
  optimization: {
    moduleIds: 'deterministic', // 长缓存：根据模块内容分配 id
    runtimeChunk: true, // 独立运行时代码
    // 代码压缩
    minimize: true,
    minimizer: [
      new EsbuildPlugin({
        target: 'es2015',
        minify: true, // 压缩代码
        legalComments: 'none' // 移除注释
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
        use: [
          {
            loader: 'esbuild-loader',
            options: {
              loader: 'tsx', // 可以是'ts'或'tsx'，取决于您的项目设置
              target: 'es2015' // 目标浏览器或Node.js版本
            }
          }
        ]
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
    // 指定 html 模板
    new HTMLWebpackPlugin({
      template: './index.html',
      favicon: resolve(__dirname, '../public/favicon.ico')
    }),
    // Vue 插件
    new DefinePlugin({
      __VUE_PROD_DEVTOOLS__: false, // 禁用 Vue 生产环境下的开发工具
      __VUE_OPTIONS_API__: true // 启用 vue2 option api
    }),
    // 解析 .vue 单文件
    new VueLoaderPlugin(),
    // CSS 优化：生成独立的 CSS 文件
    new MiniCssExtractPlugin({
      filename: 'style/[name].[contenthash:6].css'
    }),
    // Element UI 优化
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ]
}

module.exports = commonConfig
