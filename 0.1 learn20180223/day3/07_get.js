/**
 * app.get() 去处理 post 请求，req.queryy来获得客户端传给服务器的数据
 */
var express = require("express");
var app = express();

app.use(express.static("./",{
    index:"07_get.html"
}));

app.get("/me/getdata",function(req,res){
    // 不需要再通过url模块去分析参数部分，直接用req.query
    console.log(req.query);
    res.send(req.query);
});

app.listen(3000);