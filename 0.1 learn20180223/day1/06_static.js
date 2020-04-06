// 静态资源服务器
// 根据页面请求的地址 , 如果路径是一个文件夹 , 则打开文件夹的index.html文件
// 如果路径是一个文件 , 则打开该文件
// 如果找不到对应的文件 , 则返回404

let http = require("http");
let url = require("url");
let fs = require("fs");
let path = require("path");
let contentType = require("./contentType").type;
contentType = JSON.parse(contentType);




let server = http.createServer(function(req, res) {

    console.log(req.statusMessage);

    let pathname = url.parse(req.url, true).pathname;

    if (pathname.indexOf(".") == -1) { // 没有"." 代表是文件夹
        pathname += "/index.html";
    }

    let isOrigin = false; // 是否直接查看源文件
    if (pathname.indexOf("/origin") == 0) { // 开头是 /origin
        let remove_origin_pathname = pathname.slice(7); // 去除 "/origin"
        var file_pathname = path.normalize("./" + remove_origin_pathname); // 给 fs.readFile 的 path
        isOrigin = true;
    } else { // 开头没有 /origin
        var file_pathname = path.normalize("./" + pathname); // 给 fs.readFile 的 path
    }



    fs.readFile(file_pathname, "utf8", function(err, data) {
        console.log(pathname, file_pathname);
        if (err) {
            console.error("readFile发生错误----" + err);
            show404(res);
        } else {
            if (isOrigin) { // 这里可以理解为路由控制
                res.writeHead(200, {
                    "content-type": "text/plain;charset=utf8" // 不加;charset=utf8 css js中文会乱码
                });
            } else { // 这里才是真正的静态服务器
                let extname = path.extname(file_pathname);
                let type = contentType[extname];
                console.log(type);
                if (type) {
                    res.writeHead(200, {
                        "content-type": type + ";charset=utf8"
                    });
                }
            }
            res.write(data);
            res.end();
        }
    });
    
}).listen(3000);

// function showIndex(path, res) {
//     fs.readFile(path, function(err, data) {
//         if (err) {
//             show404(res);
//         } else {
//             res.writeHead(200, {
//                 "content-type": "text/html;charset=utf8"
//             });
//             res.write(data);
//             res.end();
//         }
//     });
// }

function show404(res) {
    fs.readFile("./static/404.html", function(err, data) {
        if (err) {
            throw err;
        } else {

            // res.writeHead(404, {
            //     "content-type": "text/html;charset=utf8"
            // });

            // 重定向
            // res.writeHead(302, {
            //     'Location': '/static/404.html'
            // });

            res.writeHead(302, {
                "content-type": "text/html;charset=utf8",
                'location': '/static/404.html'
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