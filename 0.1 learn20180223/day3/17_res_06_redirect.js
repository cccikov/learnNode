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
 * express 使用路由功能时，路径匹配的时候会忽略最后面的斜杠，无论是浏览器请求的路径，还是路由方法path里面写的路径。就是当成是只能是目录路径来处理
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

/* 其实 path.resolve 也是一样，路径末尾是否有 "/" 都一样 */
console.log(__filename); // 当前模块的文件路径
console.log(__dirname); // 当前模块的所在目录
console.log(__dirname + "/"); // 当前模块的所在目录
console.log(path.resolve(__filename, "./express_API.md"));
console.log(path.resolve(__dirname, "./express_API.md"));
console.log(path.resolve(__dirname + "/", "./express_API.md"));
console.log(path.join(__dirname, "./", "express_API.md"));
console.log(path.join(__dirname, "./", "express_API.md") ===  path.resolve(__dirname + "/", "./express_API.md"));
console.log(path.resolve(__dirname + "/", "./express_API.md", "./day3.md"));
console.log(path.resolve(path.dirname(__filename), path.dirname("./express_API.md"), "./day3.md"));
// path.resolve() 给定的路径的序列是从右往左被处理的，后面每个 path 被依次解析，直到构造完成一个绝对路径。
// path.resolve() 会把每个参数里面的路径都当成是目录路径来处理，但由于是从右往左被处理，所以最后的一个路径的每个部分都会保留，所以文件路径放在最后是没有问题的；但是只要不是最后的一个参数，都要转化为目录路径，就是除去文件名部分。


// path.join(path1，path2，path3.......) 将路径片段使用特定的分隔符（window：\）连接起来形成路径，并规范化生成的路径。若任意一个路径片段类型错误，会报错。















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

// back重定向，重定向到请求头的 referer，当没有 referer 请求头的情况下，默认为‘/’
app.get("/redirect/back/a/b/c/d/e", function (req, res, next) {
    res.locals.before = req.originalUrl;
    app.locals.before = req.originalUrl;
    res.redirect("back");
});
// http://localhost:3000/redirect/back/a/b/c/d/e
// http://localhost:3000/redirect/back/a/b/c/d/e/



/**
 * redirect 重定向
 */
app.get("/location/first", function (req, res, next) {
    res.locals.before = req.originalUrl;
    app.locals.before = req.originalUrl;
    res.status(302); // 要设置状态码
    res.location('/haha');
    res.end(); // 还要调用结束响应
});
// http://localhost:3000/location/first

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