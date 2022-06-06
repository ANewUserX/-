module.exports = {
  configureWebpack:{
    resolve:{
      alias:{
        'assets':'@/assets',
        'components':'@/components',
        'views':'@/views',
        'store':'@/store',
        'api':'@/api',
        'utils':'@/utils'
      }
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:2022',
        // pathRewrite: { '^/api': '' },
      },
      '/my': {
        target: 'http://127.0.0.1:2022',
        // pathRewrite: { '^/api': '' },
      },
    },
  }
}