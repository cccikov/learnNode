const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http); // A standalone build of the client is exposed by default by the server at /socket.io/socket.io.js.
// 会自动向客户端返回对应的 socket.io-client js 文件

app.use(express.static("./"));

io.on('connection', function (socket) {

    console.log("链接了 connection")

    socket.emit('server msg', {
        hello: 'world',
        date: new Date()
    });

    socket.on('client msg', function (data) {
        console.log(data);
        socket.emit('server msg', {
            msg: "服务端已经接受消息",
            client_msg: data,
            date: Date.now(),
            delta: Date.now() - data.date
        });
    });

    socket.on('server close', function () {
        console.log("客户端要求我们关闭服务端");
        io.close()
    });

    socket.on('disconnect', function (arg) {
        // 不管是那边主动都会触发
        console.log("连接关闭了",arg);
    });

});

http.listen(3000, arg => {
    console.log("server running on 3000");
});