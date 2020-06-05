const express = require("express");
const path = require("path")
const {
    createProxyMiddleware: proxy
} = require('http-proxy-middleware');

const wsProxy = proxy('/websocket', {
    target: 'ws://echo.websocket.org',
    changeOrigin: true,
    ws: true, // enable websocket proxy
    logLevel: 'debug',
    pathRewrite: {
        '^/websocket': '', // 重写, 记得一定要重写啊，不然真的向 ws://echo.websocket.org/websocket 请求的
    },
});

const app = express();
app.use("/", express.static(path.join(__dirname, "./")));
app.use(wsProxy)

const server = app.listen(3000);
server.on('upgrade', wsProxy.upgrade); // optional: upgrade externally


console.log('[DEMO] Server: listening on port 3000');
console.log('[DEMO] Opening: http://localhost:3000');
require('open')('http://localhost:3000');