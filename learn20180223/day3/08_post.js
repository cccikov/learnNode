/**
 * app.post() 去处理 post 请求，req.body来获得客户端传给服务器的数据
 */

var express = require("express");
var app = express();
var bodyParser = require('body-parser');

app.use(express.static("./", {
    index: "08_post.html"
}));

// 根据请求头的Content-Type采用不同的中间件，可以全部都写，因为会将控制权交给下一个中间件
/* app.use(bodyParser.json()); // for parsing application/json 但是好像angular的post请求是这个
app.use(bodyParser.urlencoded({
    extended: true
})); // for parsing application/x-www-form-urlencoded post请求默认是"Content-Type":"application/x-www-form-urlencoded"

app.post("/me/postdata", function (req, res) {
    console.log(req.body);
    res.send(req.body);
}); */

// 相当于

app.post("/me/postdata", bodyParser.urlencoded({
    extended: true
}), bodyParser.json(), function (req, res) {
    console.log(req.body);
    res.send(req.body);
});
// 这里也是3个中间件，也是要考虑顺序的

app.listen(3000, "127.0.0.1");