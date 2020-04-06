/**
 * cookie
 */

var express = require("express");
var app = express();
var cookie_parser = require("cookie-parser");

console.log(new Date(0)); //
app.use(cookie_parser());

app.get("/", function (req, res, next) {
    var cookie_name = req.cookies.name;
    if (!cookie_name) {
        res.cookie("name", "ccc", {
            maxAge: 60 * 1000,
            httpOnly: true
        }); // 过期时间是GMT时间，就是在浏览器中显示的时间是GMT时间，加8个小时就是中国时区时间；但是new Date()不用转化，因为也是GMT时间，只是在浏览器中转化为中国时区来显示，本质时间戳还是那个。
    } else {
        console.log(cookie_name);
    }
    res.end();
});


/**
 * 路由
 * 显示旅游目的地的旅游攻略
 * 记录查询过的目的地，发在cookie中
 * 如果没有输入任何目的地，自动根据cookie弹出猜你喜欢
 */
app.get("/journey", function (req, res, next) {
    var destination = req.query.dest; // 查询的目的地
    var destination_cookie = req.cookies.dest || []; // 记录的目的地
    if (!!destination) { // 参数中带有目的地
        if (destination_cookie.indexOf(destination) == -1) { // cookie 查重
            destination_cookie.push(destination);
            res.cookie("dest", destination_cookie, {
                maxAge: 24 * 60 * 60 * 1000
            }); // cookie 可以直接存放数组
        }
        res.send("你查询的目的地是" + destination);
    } else {
        if (destination_cookie.length > 0) {
            res.send("猜你喜欢：" + destination_cookie);
        } else {
            res.send("你之前未查询过任何地点");
        }
    }
});
// http://localhost:3000/journey?dest=佛山
// http://localhost:3000/journey

app.listen(3000);