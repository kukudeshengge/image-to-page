const { createProxyMiddleware } = require('http-proxy-middleware')

const proxyList = [
    {
        path: '/api_font',
        target: 'https://acsit.jrdaimao.com',
        pathRewrite: {
            '^/api_font': ''
        }
    },
]

module.exports = app => {
    proxyList.forEach(item => {
        app.use(item.path, createProxyMiddleware({
            target: item.target,
            changeOrigin: true,
            pathRewrite: item.pathRewrite
        }))
    })
}
