const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

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

http.listen(3000, arg => {
    console.log("server running on 3000");
});