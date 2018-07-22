var express = require("express");
var app = express();
var fs = require("fs");

/**
 * 入口页面
 */
app.get("/", function (req, res, next) {
    res.sendFile(__dirname + "/13_res_02.html", function (err) {
        if (err) {
            console.log(err);
            res.status(err.status).end();
        } else {
            console.log('enter');
        }
    });
});


// send
app.get("/express/send", function (req, res, next) {
    res.send({
        name: "ccc",
        age: 18
    });
});

// sendFile
app.get("/express/sendFile", function (req, res, next) {
    res.sendFile(__dirname + "/13_res_02.html");
});

// download
app.get("/express/download", function (req, res, next) {
    res.download(__dirname + "/13_res_02.html");
});

// json
app.get("/express/json", function (req, res, next) {
    res.json({
        name: "ccc",
        age: 18
    });
    // 这个方法和将一个对象或者一个数组作为参数传递给res.send()方法的效果相同。不过，你可以使用这个方法来转换其他的值到json，例如null，undefined。(虽然这些都是技术上无效的JSON)。
});

// end
app.get("/express/end", function (req, res, next) {
    console.log(res.end("first end")); // true 第一次结束有效
    console.log(res.end("second end")); // false 第一次之后的结束都没效
});

// jsonp
app.set("jsonp callback name", 'cb'); // 指定默认JSONP回调的名称。
app.get("/express/jsonp", function (req, res, next) {
    res.jsonp({
        "name": "ccc",
        "age": 20
    });
    // 如果客户端的请求不包含callback参数，只是返回一个json
});


/**
 * 错误
 */
app.get("/error", function (req, res, next) {
    var num = parseInt(Math.random() * 6 + 1);
    console.log(num);
    res.send("haha");
    switch (num) {
        case 1:
            res.send({
                name: "ccc",
                age: 18
            });
            break;
        case 2:
            res.sendFile(__dirname + "/13_res_02.html", function (err) {
                console.log("里面发出错误");
                console.log(err);
            });
            break;
        case 3:
            res.download(__dirname + "/13_res_02.html", function (err) {
                console.log("里面发出错误");
                console.log(err);
            });
            break;
        case 4:
            res.json({
                name: "ccc",
                age: 18
            });
            break;
        case 5:
            res.jsonp({
                "name": "ccc",
                "age": 20
            });
            break;
        case 6:
            res.end("end");
            break;
    }


});



app.listen(3000);