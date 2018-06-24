var express = require("express");
var app = express();

app.use("/", (req, res, next) => {
    console.log("app.use('/') req.url:" + req.url);
    console.log("app.use('/') req.baseUrl:" + req.baseUrl);
    console.log("app.use('/') req.originalUrl:" + req.originalUrl);
    console.log("app.use('/') req.path:" + req.path);
    console.log("app.use('/') req.query:" + req.query);
    console.log("\n")
    next();
});

app.use("/admin", (req, res, next) => {
    console.log("app.use('/admin') req.url:" + req.url);
    console.log("app.use('/admin') req.baseUrl:" + req.baseUrl);
    console.log("app.use('/admin') req.originalUrl:" + req.originalUrl);
    console.log("app.use('/admin') req.path:" + req.path);
    console.log("app.use('/admin') req.query:" + req.query);
    console.log("\n")
    next();
});

app.get("/admin/index", function (req, res, next) {
    console.log("app.get('/admin/index') req.url:" + req.url);
    console.log("app.get('/admin/index') req.baseUrl:" + req.baseUrl);
    console.log("app.get('/admin/index') req.originalUrl:" + req.originalUrl);
    console.log("app.get('/admin/index') req.path:" + req.path);
    console.log("app.get('/admin/index') req.query:" + req.query);
    console.log("\n")
    res.send("index");
});

app.use("/", (req, res, next) => {
    res.send("not thing")
});

app.listen(3000);
// http://localhost:3000/admin/index?name=ccc&age=18&gender=female