const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const prodConfig = {
  mode: 'production',
  devtool: 'nosources-source-map',
  plugins: [new BundleAnalyzerPlugin()],
  performance: {
    maxEntrypointSize: 10000000,
    maxAssetSize: 30000000
  }
}

module.exports = prodConfig
