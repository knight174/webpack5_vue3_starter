// // webpack.config.js
// const path = require('path')
// const { VueLoaderPlugin } = require('vue-loader')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const { DefinePlugin } = require('webpack')
// const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const webpack = require('webpack');

// module.exports = {
//     mode: 'development',
//     devtool: 'eval-cheap-module-source-map',
//     // mode: 'production',
//     // devtool: 'nosources-source-map',
//     optimization: { // 仅在开发配置，生产环境不需要这个，因为会默认添加
//         usedExports: true,
//     },
//     entry: {
//         path: './src/main.ts'
//     },
//     output: {
//         filename: 'assets/js/[name].[contenthash:6].js',
//         path: path.resolve(__dirname, './dist'),
//         clean: true
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.vue$/,
//                 exclude: /node_modules/,
//                 use: 'vue-loader',
//             },
//             {
//                 test: /\.tsx?$/,
//                 exclude: /node_modules/,
//                 use: [
//                     {
//                         loader: 'ts-loader',
//                         options: { appendTsSuffixTo: [/\.vue$/] }, // 这个很关键，不可删除
//                     }
//                 ],
//             },
//             {
//                 test: /\.js$/,
//                 exclude: /node_modules/,
//                 use: {
//                     loader: 'babel-loader'
//                 }
//             },
//             {
//                 test: /\.s?css$/,
//                 exclude: /node_modules/,
//                 use: ["style-loader", "css-loader", "sass-loader", "postcss-loader"],
//             },
//             {
//                 test: /\.(jpe?g|png|gif|svg|bmp|tiff)$/,
//                 exclude: /node_modules/,
//                 type: "asset",
//                 generator: {
//                     filename: 'assets/images/[name]_[hash][ext]',
//                 },
//                 parser: {
//                     dataUrlCondition: {
//                         maxSize: 8 * 1024
//                     }
//                 },
//             },
//             {
//                 test: /\.(otf|eot|woff2?|ttf|svg)$/,
//                 exclude: /node_modules/,
//                 type: "asset",
//             },
//         ]
//     },
//     resolve: {
//         extensions: ['.tsx', '.ts', '.js'],
//     },
//     plugins: [
//         new CleanWebpackPlugin(),
//         new HtmlWebpackPlugin({
//             template: path.resolve(__dirname, './index.html'),
//             favicon: path.resolve(__dirname, './public/favicon.ico') // 设置站点的 favicon，取代 index.html 模板中的 link:icon 标签
//         }),
//         new DefinePlugin({
//             __VUE_PROD_DEVTOOLS__: false,
//             __VUE_OPTIONS_API__: true,
//         }),
//         new VueLoaderPlugin(),
//         new webpack.HotModuleReplacementPlugin()
//     ],
//     devServer: {
//         static: path.join(__dirname, 'dist'),
//         open: true, // 开启服务器时，自动打开页面
//         compress: true, // 开启 gzip 压缩
//         port: 9000, // 自定义端口号
//         hot: 'only', // 开启热更新
//         // publicPath: '/' // 服务器访问静态资源的默认路径，优先级高于 output.publicPath
//     },
// }


const commonConfig = require('./build/webpack.common.config.js')
const productionConfig = require('./build/webpack.prod.config.js')
const developmentConfig = require('./build/webpack.dev.config.js')
const { merge } = require('webpack-merge');

module.exports = (env) => {
    console.log(env);
    const isProduction = env && env.production
    const config = isProduction ? productionConfig : developmentConfig
    return merge(commonConfig, config)
}
