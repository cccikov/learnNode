var express = require("express");
var app = express();
const path = require("path")
const {
    createProxyMiddleware: proxy
} = require('http-proxy-middleware');

app.use("/appweb", proxy("/appweb", {
    target: 'https://adm_t.maijju.com', // 202 外网
    changeOrigin: true,
    secure: false,
}));

app.use("/micro-web", proxy({
    target: 'https://adm_t.maijju.com', // 202 外网
    changeOrigin: true,
    secure: false,
}));

app.use("/micro-com-rest", proxy({
    target: 'https://adm_t.maijju.com', // 202 外网
    changeOrigin: true,
    secure: false,
}));


app.use("/", express.static(path.join(__dirname, "../dist")));

app.listen(6080);