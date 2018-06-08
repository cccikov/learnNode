/**
 * 中间件流程顺序
 */
var express = require("express");


/* 采用顺序1 */
{
    let app = express();

    // 假如访问的页面网址 "/用户名/用户id"格式的 如： "http://localhost:3000/ccc/123456"
    app.get('/:username/:id', function (req, res, next) {
        console.log(req.params);
        res.send("用户名：" + req.params.username + "，id：" + req.params.id);
    });

    // 假如再有一个页面是 后面管理登录页面 /admin/login
    app.get('/admin/login', function (req, res, next) {
        res.send("后台管理登录页面")
    });

    app.listen(3000);

    // 当访问 "http://localhost:3000/admin/login"  页面会显示 用户名：admin，id：login
    // 因为/admin/login也是符合第一个路由的格式，第一个路由已经终止了请求-响应循环，这个请求就已经结局了，不会再调用下一个中间件，除非调用next()
}




{

    /* 更改了一下 中间件流程顺序 ， 注意这个端口是8000 */
    let app = express();
    app.get('/admin/login', function (req, res, next) {
        res.send("后台管理登录页面")
    });
    app.get('/:username/:id', function (req, res, next) {
        console.log(req.params);
        res.send("用户名：" + req.params.username + "，id：" + req.params.id);
    });
    app.listen(8000);

    // "http://localhost:8000/admin/login" 现在页面显示的是 后台管理登录页面
}





let app = express();
app.get("/test", function (req, res, next) {
    res.write("1");
    next();     
});
app.get("/test", function (req, res, next) {
    res.write("2");
    next();    
});
app.get("/test", function (req, res, next) {
    res.end("3");
});
// 如果挂载的路径和方法是一样的，那么可以写在一起
app.get("/test2", function (req, res, next) {
    res.write("1");
    next();     
},function (req, res, next) {
    res.write("2");
    next();     
},function (req, res, next) {
    res.end("3");
});

app.listen(80);