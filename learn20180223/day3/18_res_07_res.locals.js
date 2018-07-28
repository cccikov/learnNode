var express = require("express");
var app = express();

app.use("/",function(req,res,next){
    res.locals.index = new Date();
    next();
});

app.use("/:user",function(req,res,next){
    res.locals.user = req.params.user;
    next();
});

app.get("/admin/:id",function(req,res,next){
    res.locals.id = req.params.id;
    next();
});

app.set("view engine", "pug");
app.get("/template/:file",function(req,res,next){
    res.locals.file = req.params.file;
    res.render("18_res_07_res.locals.pug");
});

app.use(function(req,res,next){
    res.locals.last = new Date();
    res.send(res.locals);
});

// http://localhost:3000
// http://localhost:3000/admin
// http://localhost:3000/admin/123
// http://localhost:3000/admin/123/123123

app.listen(3000);

// res.locals 不仅是一个包含了本次请求的响应中的变量的对象；还可以用于存储渲染视图的数据，渲染视图是自动获取res.locals里面对面的属性。