const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: "https://connected-api-y0cx.onrender.com/api/v1",
      changeOrigin: true,
    })
  );
};
