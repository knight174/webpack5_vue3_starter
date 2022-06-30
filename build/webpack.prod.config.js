const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const prodConfig = {
  mode: 'production',
  devtool: 'nosources-source-map',
  plugins: [
    new BundleAnalyzerPlugin()
  ]
};

module.exports = prodConfig;
