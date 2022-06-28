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
                use: ["style-loader", "css-loader", "sass-loader", "postcss-loader"],
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
