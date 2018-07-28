var express = require("express");
var app = express();
var path = require("path");



/*  */
// 既匹配 "/first" 也匹配 "/first/"
app.get("/first", function (req, res, next) {
    console.log(req.route);
    res.send("进入的是 /first 路由");
});

// 既匹配 "/second" 也匹配 "/second/"
app.get("/second/", function (req, res, next) {
    console.log(req.route);
    res.send("进入的是 /second/ 路由");
});

// 匹配的是 "/use" "/use/....."
app.use("/use/", function (req, res, next) {
    res.send("进入的是 /use/ 路由");
});

/**
 * express 使用路由功能时，路径匹配的时候会忽略最后面的斜杠，无论是浏览器请求的路径，还是路由方法path里面写的路径。
 *
 * 比如 /a/b/c/d/e 和 /a/b/c/d/e/
 *
 * 路径的每一部分可以看成是每一级的目录，从 a 开始一直往下找，由于是路由控制，所以是没有文件的，只有目录，无论 e 后面有无"/",最后的一级都是 e
 *
 * "/" 叫做 路径分隔符 "/"后面没有东西了，分隔出来的东西其实都是一样的，所以就算后面有无加 "/" ，路径都是指向同一个位置
 *
 * 所以作为路由的时候，我们已经知道整个路径是怎么样了，已经确定了url了，就是这个信息的位置了，所以后面有无"/"都无所谓，而且一般我们输入url最后都不会有"/"
 *
 * 就算是静态资源服务器，一级一级往下走到了路径最后部分，如果不是文件而是文件夹，就算没有"/"作为结尾，也一般是显示该文件夹的index.html文件（一般的静态资源管理器都会重定向补回最后的"/"），但是资源管理器结尾有无"/"，还是区别挺大的，如果不是文件只是目录的话，路径末尾有无加"/"都无什么所谓，但是如果是文件路径，路径末尾加上"/"出错了
 *
 * 但是跳转的时候，最后有无 "/" , 还是挺重要的；一个路径以"/"结尾视为指向目录(directory)，否则视为指向文件(file)。
 */


















/**
 * redirect 重定向
 */

app.get("/redirect/first", function (req, res, next) {
    res.locals.before = req.originalUrl;
    app.locals.before = req.originalUrl;
    res.redirect("haha");
});
// http://localhost:3000/redirect/first
// http://localhost:3000/redirect/first/

app.get("/redirect/second", function (req, res, next) {
    res.locals.before = req.originalUrl;
    app.locals.before = req.originalUrl;
    res.redirect("/haha");
});
// http://localhost:3000/redirect/second
// http://localhost:3000/redirect/second/

app.get("/redirect/third", function (req, res, next) {
    res.locals.before = req.originalUrl;
    app.locals.before = req.originalUrl;
    res.redirect("./haha");
});
// http://localhost:3000/redirect/third
// http://localhost:3000/redirect/third/

app.get("/redirect/a/b/c/d/e", function (req, res, next) {
    res.locals.before = req.originalUrl;
    app.locals.before = req.originalUrl;
    res.redirect("../../haha");
});
// http://localhost:3000/redirect/a/b/c/d/e
// http://localhost:3000/redirect/a/b/c/d/e/

// console.log(path.resolve("/a/b/c/d/e/","../../haha"));
// console.log(path.resolve("/a/b/c/d/e/","./../../haha"));

app.use("/", function (req, res, next) {
    res.locals.after = req.originalUrl;
    app.locals.after = req.originalUrl;
    var obj = {
        "res.locals": {
            "before": res.locals.before || null,
            "after": res.locals.after,
        },
        "app.locals": {
            "before": app.locals.before || null,
            "after": app.locals.after,
        },
    }
    res.send(obj);
});

// app.locals 各属性值将贯穿程序的整个生命周期，即从 express() 调用开始到整个程序结束前都会存在
// res.locals 是只在这次请求的生命周期中有效。就是每次请求就有个一新的 res.locals 。所以重定向之后就是新的请求的了，是看不到重定向前 res.locals 的数据的。



app.listen(3000);