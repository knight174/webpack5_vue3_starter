// webpack.config.js
const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: {
        path: './src/main.ts'
    },
    output: {
        filename: 'assets/js/[name].[contenthash:6].js',
        path: path.resolve(__dirname, './dist')
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: { appendTsSuffixTo: [/\.vue$/] }, // 这个很关键，不可删除
                    }
                ],
                exclude: /node_modules/,
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
                use: ["style-loader", "css-loader", "sass-loader", "postcss-loader"],
            },
            {
                test: /\.(jpe?g|png|gif)$/,
                type: "asset",
                generator: {
                    filename: 'images/[name]_[hash][ext]',
                },
                parser: {
                    dataUrlCondition: {
                        maxSize: 8 * 1024 // 8kb （低于8kb都会压缩成 base64）
                    }
                },
            },
            {
                test: /\.(otf|eot|woff2?|ttf|svg)$/,
                type: "asset",
            },
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './index.html')
        })
    ]
}
