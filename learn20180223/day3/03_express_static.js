/**
 * express 静态服务器能力
 */

var express = require("express");
var app = express();

// app.use(express.static("public")); // 是一个文件夹，包含html等东西的静态资源根目录，可以复制任何项目尝试，但是就不再git上提交了
app.use(express.static("./")); // 以当前文件夹作为静态资源根目录
// express.static为中间件
// 中间件（Middleware） 是一个函数，它可以访问请求对象（request object (req)）, 响应对象（response object (res)）, 和 web 应用中处于请求-响应循环流程中的中间件，一般被命名为 next 的变量。

app.listen(3000);