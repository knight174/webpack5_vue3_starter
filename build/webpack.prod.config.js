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
  }
}

module.exports = prodConfig
