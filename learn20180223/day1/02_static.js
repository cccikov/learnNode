// 静态资源服务器
// 根据页面请求的地址 , 如果路径是一个文件夹 , 则打开文件夹的index.html文件
// 如果路径是一个文件 , 则打开该文件
// 如果找不到对应的文件 , 则返回404

let http = require("http");
let url = require("url");
let fs = require("fs");
let path = require("path");




let server = http.createServer(function (req, res) {

    let pathname = url.parse(req.url, true).pathname;

    let isOrigin = false; // 是否直接查看源文件
    if (pathname.indexOf("/origin") == 0) { // 开头是 /origin
        let remove_origin_pathname = pathname.slice(7); // 去除 "/origin"
        var file_pathname = path.normalize("./" + remove_origin_pathname); // 给 fs.readFile 的 path
        isOrigin = true;
    } else { // 开头没有 /origin
        var file_pathname = path.normalize("./" + pathname); // 给 fs.readFile 的 path
    }

    fs.readFile(file_pathname, function (err, data) {
        console.log(pathname, file_pathname);
        if (err) {
            console.error("readFile发生错误----" + err);
            fs.stat(file_pathname, function (err, state) {
                if (err) {
                    console.error("stat发生错误----" + err);
                    show404(res);
                } else {
                    var isDirectory = state.isDirectory();
                    if (isDirectory) {
                        showIndex(file_pathname + "index.html", res);
                    }
                }
            });
        } else {
            if (isOrigin) {
                res.writeHead(200, {
                    "content-type": "text/plain;charset=utf8"
                })
            }
            res.write(data);
            res.end();
        }
    });

}).listen(3000);

function showIndex(path, res) {
    fs.readFile(path, function (err, data) {
        if (err) {
            show404(res);
        } else {
            res.writeHead(200, {
                "content-type": "text/html;charset=utf8"
            });
            res.write(data);
            res.end();
        }
    });
}

function show404(res) {
    fs.readFile("./static/404.html", function (err, data) {
        if (err) {
            throw err;
        } else {
            res.writeHead(404, {
                "content-type": "text/html;charset=utf8"
            });
            res.write(data);
            res.end();
        }
    });
}

/**
    ┌─────────────────────────────────────────────────────────────────────────────────────────────┐
    │                                            href                                             │
    ├──────────┬──┬─────────────────────┬─────────────────────┬───────────────────────────┬───────┤
    │ protocol │  │        auth         │        host         │           path            │ hash  │
    │          │  │                     ├──────────────┬──────┼──────────┬────────────────┤       │
    │          │  │                     │   hostname   │ port │ pathname │     search     │       │
    │          │  │                     │              │      │          ├─┬──────────────┤       │
    │          │  │                     │              │      │          │ │    query     │       │
    "  https:   //    user   :   pass   @ sub.host.com : 8080   /p/a/t/h  ?  query=string   #hash "
    │          │  │          │          │   hostname   │ port │          │                │       │
    │          │  │          │          ├──────────────┴──────┤          │                │       │
    │ protocol │  │ username │ password │        host         │          │                │       │
    ├──────────┴──┼──────────┴──────────┼─────────────────────┤          │                │       │
    │   origin    │                     │       origin        │ pathname │     search     │ hash  │
    ├─────────────┴─────────────────────┴─────────────────────┴──────────┴────────────────┴───────┤
    │                                            href                                             │
    └─────────────────────────────────────────────────────────────────────────────────────────────┘
 */