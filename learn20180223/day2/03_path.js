var fs = require("fs");
var m2 = require("./module2");
var path = require("path");

console.log(__filename); // 当前模块的文件名称 -- 解析后的绝对路径。就是当前文件所在的地址(目录加文件名)
console.log(__dirname); // 当前模块的文件夹名称 -- 解析后的绝对路径。 就是当前文件所在的目录
console.log(path.dirname(__filename)); // path.dirname() 方法返回一个 path 的目录名
console.log(path.dirname(__dirname)); // path.dirname() 方法返回一个 路径 所在的目录名 

console.log(m2);

fs.readFile("./module2.js", function (err, data) {
    if (err) {
        console.error("读取文件方式1",err);
    } else {
        console.log("成功利用方式1读取文件")
    }
});

/*
 * 终端命令符的定位路径是 learnNode
 * 
 * 执行命令是
 * node learn20180223/day2/03_path.js
 * 
 * 抛出错误
 * Error: ENOENT: no such file or directory, open 'D:\learnNode\module2.js'
 */

fs.readFile(__dirname + "/module2.js", function (err, data) {
    if (err) {
        console.error("读取文件方式2",err);
    } else {
        console.log("成功利用方式2读取文件")
    }
});