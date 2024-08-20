const { createProxyMiddleware } = require('http-proxy-middleware')

const proxyList = [
  {
    path: '/api_font',
    target: 'https://acsit.jrdaimao.com',
    pathRewrite: {
      '^/api_font': ''
    }
  },
  {
    path: '/image_to_h5',
    target: 'http://localhost:3999',
    pathRewrite: {
      '^/image_to_h5': ''
    }
  },
  {
    path: '/api_link',
    target: 'https://topicsit.jrdaimao.com',
  },
]

module.exports = app => {
  proxyList.forEach(item => {
    app.use(item.path, createProxyMiddleware({
      target: item.target,
      changeOrigin: true,
      pathRewrite: item.pathRewrite,
      secure: false,
    }))
  })
}
