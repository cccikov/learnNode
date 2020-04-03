const express = require("express");
const http = require("http");

const app = express();
const httpServer = http.createServer(app); // 返回一个 http.Server 实例，接收的参数，就是类似express中间件，所以可以使用将app作为参数传入
/* const server = http.Server(app); // 所以直接用 http.Server 也是可以的 */

const SocketServer = require('socket.io');
const io = new SocketServer(httpServer); // A standalone build of the client is exposed by default by the server at /socket.io/socket.io.js.
// 会自动向客户端返回对应的 socket.io-client js 文件

app.use(express.static("./"));

io.on('connection', function (socket) {

    socket.emit('news', {
        hello: 'world',
        date: new Date()
    });

    socket.on('my other event', function (data) {
        console.log(data);
    });
});

httpServer.listen(3000, arg => {
    console.log("server running on 3000");
});