const express = require("express");
const app = express();
const http = require('http')
const querystring = require("querystring")

/* get 请求 */
app.get("/get", function (req, res) {
    let _res = res;

    /* get 请求 */
    let params = querystring.stringify({
        name: "ccc",
        age: 28,
        by: "http.request",
        mehtod: "get"
    });
    const http_req = http.request({
        host: '127.0.0.1',
        port: 3000,
        path: "/data" + "?" + params,
        method: 'GET'
    }, http_res => {
        console.log(`statusCode: ${http_res.statusCode}`)
        let data = "";
        http_res.on('data', chunk => {
            data += chunk;
            console.log(process.stdout.write(chunk))
            _res.send(data);
        })
    })
    http_req.on('error', error => {
        _res.send(error.message);
    })
    http_req.end()
    /* get 请求完毕 */
});


/* post formData 请求 */
app.get("/formData", function (req, res) {
    let _res = res;

    const data = querystring.stringify({
        name: "ccc",
        age: 28,
        by: "http.request",
        method: "post"
    });// 和 JSON 区别

    const http_req = http.request({
        host: '127.0.0.1',
        port: 3000,
        path: "/data",
        method: 'POST',
        headers: { // 和 JSON 区别
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(data)
        }
    }, http_res => {
        console.log(`statusCode: ${http_res.statusCode}`)
        let data = "";
        http_res.on('data', chunk => {
            data += chunk;
            console.log(process.stdout.write(chunk))
            _res.send(data);
        })
    })
    http_req.on('error', error => {
        _res.send(error.message);
    })
    http_req.write(data)
    http_req.end()

});


/* post json 请求 */
app.get("/json", function (req, res) {
    let _res = res;

    const data = JSON.stringify({
        name: "ccc",
        age: 28,
        by: "http.request",
        method: "post"
    })

    const http_req = http.request({
        host: '127.0.0.1',
        port: 3000,
        path: "/data",
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    }, http_res => {
        console.log(`statusCode: ${http_res.statusCode}`)
        let data = "";
        http_res.on('data', chunk => {
            data += chunk;
            console.log(process.stdout.write(chunk))
            _res.send(data);
        })
    })
    http_req.on('error', error => {
        _res.send(error.message);
    })
    http_req.write(data)
    http_req.end()

});

/* 页面提示 */
app.get("/:path", function (req, res) {
    res.send("请加上 \"/get\" 或者 \"/json\" \"/formData\" 路径，现在路径为: \"/" + req.params.path + "\"");
})
app.get("/", function (req, res) {
    res.send("请加上 \"/get\" 或者 \"/json\" \"/formData\" 路径");
})

app.listen(7008);