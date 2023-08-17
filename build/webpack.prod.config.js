const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const prodConfig = {
  mode: 'production',
  devtool: 'nosources-source-map',
  plugins: [
    // https://www.npmjs.com/package/webpack-bundle-analyzer
    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled' // 不启动展示打包报告的http服务器
      // generateStatsFile: true // 是否生成stats.json文件
    })
  ],
  performance: {
    maxEntrypointSize: 10000000,
    maxAssetSize: 30000000
  },
  optimization: {
    usedExports: true, // 消除未使用的导出（exports）代码
    // 代码分割
    splitChunks: {
      chunks: 'all', // 同步或异步
      minSize: 0, // 最小分割大小
      // 缓存分割大小
      cacheGroups: {
        // 打包 node_modules 中引用的第三方库的模块（优先级更高）
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          enforce: true, // 最高级别缓存（无视其他缓存组的优先级）
          priority: -10,
          name: 'vendors'
        },
        // 公共模块
        common: {
          minChunks: 2, // 至少在两个模块中引用的模块（将被分离到 common 代码中）
          priority: -20,
          reuseExistingChunk: true, // 模块缓存重用
          name: 'common'
        }
      }
    }
  }
}

module.exports = prodConfig
