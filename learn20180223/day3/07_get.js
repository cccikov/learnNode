var express = require("express");
var app = express();


app.use("/admin/a", function (req, res, next) {
    console.log("req.url:" + req.url);
    console.log("req.originalUrl:" + req.originalUrl);
    console.log("req.baseUrl:" + req.baseUrl);
    console.log("req.path:" + req.path);
    res.send("hehe");
});

app.use("/", function (req, res, next) {
    console.log(req.url);
    console.log(req.originalUrl);
    console.log(req.baseUrl);
    console.log(req.path);
    res.send("nothing");
});


app.listen("3000")


var http = require("http");
http.createServer(function(req,res){
    console.log(req.url);
    res.end("http");
}).listen(8000);