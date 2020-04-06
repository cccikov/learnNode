const express = require("express");
const path = require("path")
const {
    createProxyMiddleware: proxy
} = require('http-proxy-middleware');

const wsProxy = proxy('/', {
    target: 'http://192.168.0.109:6789',
    changeOrigin: true,
    ws: true, // enable websocket proxy
    logLevel: 'debug',
});

const app = express();

app.get("/favicon.ico", function (req, res) {
    res.sendStatus(404);
})
app.use("/", express.static(path.join(__dirname, "./")));
app.use(wsProxy)

const server = app.listen(3000);
server.on('upgrade', wsProxy.upgrade); // optional: upgrade externally


console.log('[DEMO] Server: listening on port 3000');
console.log('[DEMO] Opening: http://localhost:3000');
require('open')('http://localhost:3000');