// webpack.config.js
const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { DefinePlugin } = require('webpack')

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
                test: /\.(jpe?g|png|gif|svg|bmp|tiff)$/,
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
        }),
        new DefinePlugin({
            __VUE_PROD_DEVTOOLS__: false,
            __VUE_OPTIONS_API__: true,
        }),
    ]
}
