module.exports = {
  devServer: {
    host: 'api.shoogoome.com',
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://api.ras.shoogoome.com/',
        pathRewrite: { '^/api': '' },
        changeOrigin: true,
        secure: false,
      }
    }
  }
}