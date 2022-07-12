const path = require('path')

const devConfig = {
  mode: 'development',
  optimization: {
    usedExports: true,
    runtimeChunk: true,
    splitChunks: {
      chunks: 'all', // 同步或异步
      minSize: 100, // 自己设置最小分割大小
      cacheGroups: {
        // 缓存组
        // 打包第三方库
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true
          // filename: 'vendors.js'
        },
        // 打包项目中的公共模块
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
          // filename: 'common.js'
        }
      }
    }
  },
  cache: {
    type: 'filesystem'
  },
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    static: path.join(__dirname, 'dist'),
    open: true, // 开启服务器时，自动打开页面
    compress: true, // 开启 gzip 压缩
    port: 8080, // 自定义端口号
    hot: true, // 开启热更新
    proxy: {
      '/api': {
        target: 'https://res.abeim.cn', // 匹配到 '/api' 时，代理为 'https://res.abeim.cn/api'
        changeOrigin: true,
        pathRewrite: {
          '^/api': '' // 将 'https://res.abeim.cn/api' 中的 '/api' 替换为空
        }
      }
    }
  }
}

module.exports = devConfig
