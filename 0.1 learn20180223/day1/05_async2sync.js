// 异步变同步

var fs = require("fs");

var dirs = [];

fs.readdir("./static", function(err, files) {
    for (var i = 0, len = files.length; i < len; i++) {
        fs.stat("./static/" + files[i], function(err, stats) {
            if (stats.isDirectory()) {
                dirs.push(files[i]);
                console.log(i, len, files[i]);
            }
        });
    }
    console.log("dirs", dirs);
});

// 首先上面的写法是错误的
// 第一 , for循环里面的异步操作用到了循环变量i , 由于是异步 , 所以异步的回调函数里面的i的值已经等于len
// 第二 , 最后的 console.log(dirs); 由于中间是异步 , 所以肯定会先执行了console.log(dirs) 输出一个空的数组dirs

var dirs2 = [];
fs.readdir("./static", function(err, files) {
    for (var i = 0, len = files.length; i < len; i++) {
        (function(i) {
            fs.stat("./static/" + files[i], function(err, stats) {
                if (stats.isDirectory()) {
                    dirs2.push(files[i]);
                    console.log(i, len, files[i]);
                }
                if (i == len - 1) { // 其实这样也未必正确 , 因为都是异步操作 , 假设后面的异步更快执行完呢
                    console.log("dirs2", dirs2);
                }
            });
        })(i)
    }
});



// 利用函数的递归 , 将异步变成同步

var dirs3 = [];
fs.readdir("./static", function(err, files) {
    (function iterator(i) { // 递归执行
        if (i < files.length) {
            fs.stat("./static/" + files[i], function(err, stats) {
                if (stats.isDirectory()) {
                    dirs3.push(files[i]);
                    console.log(i, files[i]);
                }
                iterator(i + 1); // 在异步的回调函数里面执行
            });
        } else {
            console.log("dirs3", dirs3);
        }
    })(0);
});
