const {createProxyMiddleware} = require('http-proxy-middleware')

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:8080/skill-buddy-be/api/v1',
            changeOrigin: true,
            pathRewrite: function (path, req) {
                return path.replace('/api', '')
            }
        })
    )
}
