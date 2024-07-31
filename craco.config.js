const path = require('path')
const CracoLessPlugin = require('craco-less')
const { loaderByName } = require('@craco/craco')

const lessModuleRegex = /\.module\.less$/

module.exports = {
  // 配置兼容less和module.less文件
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {},
            javascriptEnabled: true
          }
        },
        // less
        modifyLessRule (lessRule) {
          lessRule.exclude = lessModuleRegex
          return lessRule
        },
        // lessModule
        modifyLessModuleRule (lessModuleRule) {
          lessModuleRule.test = lessModuleRegex
          const cssLoader = lessModuleRule.use.find(loaderByName('css-loader'))
          cssLoader.options.modules = {
            localIdentName: '[local]_[hash:base64:5]',
            exportLocalsConvention: 'camelCase'
          }
          return lessModuleRule
        }
      }
    }
  ],
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
    stats: {
      waiting: false
    }
  }
}
