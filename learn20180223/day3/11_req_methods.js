var express = require("express");
var app = express();

app.set("trust proxy", true);

app.get("/index/:name", (req, res, next) => {
    /* req.accepts */
    console.log(req.accepts("html")); // html
    console.log(req.accepts('text/html')); // text/html
    console.log(req.accepts("json")); // json
    console.log(req.accepts('application/json')); // application/json
    console.log(req.accepts('text/plain')); // text/plain
    console.log(req.accepts(["json", "html", "application/json", "text/html"])); // html


    // req.acceptsCharsets()
    // req.acceptsEncodings()
    // req.acceptsLanguages()


    /*req.get()*/
    console.log(req.get('Content-type'));
    console.log(req.get('Accept')); // 这个返回的是可以接受的Content-type // text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8
    console.log(req.get('Accept-Charset')); // undefined
    console.log(req.get('Accept-Encoding')); // gzip, deflate, br
    console.log(req.get('Accept-Language')); // zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6
    console.log(req.get('Cookie')); // _ga=GA1.1.1260558343.1527690478; io=hsFftHeK2HF9YCVZAAAv



    /*req.is()*/
    console.log(req.is('html'));
    console.log(req.is('text/html'));
    console.log(req.is('text/*'));
    console.log(req.is('*/*'));
    console.log(req.is('application/json'));
    console.log(req.is(['application/json', 'text/html']));


    /*req.param()*/
    console.log(req.param("name"));
    console.log(req.param("id"));
    console.log(req.query); // get 请求的路径的查询字符串
    console.log(req.body); // post 请求时提交的数据
    console.log(req.params); // 路由中命名的参数名


    res.send("haha")
});

app.listen(3000);
//  http://localhost:3000/index/admin?name=ccc&age=18&gender=male&id=123123123
