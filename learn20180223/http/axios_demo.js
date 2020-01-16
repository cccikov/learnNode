var express = require("express");
var app = express();

/* get 请求 */
app.get("/get", function (req, res) {
    const axios = require('axios');
    let _res = res;

    axios({
            url: 'http://127.0.0.1:3000/data',
            method: "get",
            params: {
                name: "ccc",
                age: 18,
                gender: "female"
            }
        })
        .then(({
            data
        }) => {
            _res.send(data);
        })
        .catch(error => {
            _res.send(error);
        })
});


/* post 请求 */
app.get("/post", function (req, res) {
    const axios = require('axios');
    let _res = res;

    axios({
            url: 'http://127.0.0.1:3000/data?fuck=true',
            method: "post",
            data: {
                name: "ccc",
                age: 18,
                gender: "female"
            },
            params: {
                name: "ccc",
                age: 18,
                gender: "female"
            }
        })
        .then(({
            data
        }) => {
            _res.send(data);
        })
        .catch(error => {
            _res.send(error);
        })
});

/* 页面提示 */
app.get("/:path", function (req, res) {
    res.send("请加上 \"/get\" 或者 \"/post\" 路径，现在路径为: \"/" + req.params.path+"\"");
})
app.get("/", function (req, res) {
    res.send("请加上 \"/get\" 或者 \"/post\" 路径" );
})

app.listen(7008);