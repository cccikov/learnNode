/*关于路径问题*/

/////////////////////////////////////////////////////////
// node有许多需要用到路径的地方，比如require()，require的路径是用当前文件（模块）所在目录出发 //
/////////////////////////////////////////////////////////
var fs = require("fs");
var m2 = require("./module2"); //require默认是用当前文件（模块）所在目录出发
var path = require("path");

console.log(__filename); // 当前模块的文件名称 -- 解析后的绝对路径。就是当前文件（模块）所在的地址(目录加文件名)
console.log(__dirname); // 当前模块的文件夹名称 -- 解析后的绝对路径。 就是当前文件（模块）所在的目录
console.log(path.dirname(__filename)); // path.dirname() 方法返回一个 path 的目录名
console.log(path.dirname(__filename) === __dirname); // true   __dirname 就是 path.dirname(__filename)
console.log(path.dirname(__dirname)); // path.dirname() 方法返回一个 路径 所在的目录名

console.log(m2);









///////////////////////////////
// fs读取的文件是以运行环境光标所在目录的路径触发的 //
///////////////////////////////

fs.readFile("./module2.js", function(err, data) {
    if (err) {
        console.error("读取文件方式1", err);
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



/////////////////////////////////////////////////////
// 使用readFile 推荐使用绝对路径，__dirname就是返回当前文件（模块）所在的目录的绝对路径 //
/////////////////////////////////////////////////////
fs.readFile(__dirname + "/module2.js", function(err, data) {
    if (err) {
        console.error("读取文件方式2", err);
    } else {
        console.log("成功利用方式2读取文件")
    }
});


/*
 * 那么如果，fs读取的文件不是在当前文件（模块）目录或当前文件（模块）目录下面的呢；而是需要去到当前文件（模块）目录更上层的目录寻找的呢
 * 就可以使用path.resolve()方法
 * path.resolve() 方法会把一个路径或路径片段的序列解析为一个绝对路径。
 */

console.log(__dirname); // 当前文件（模块）目录
console.log(path.resolve(__dirname, "./")); // 当前文件（模块）目录
console.log(path.resolve(__dirname, "../")); // 当前文件（模块）的上一层目录
console.log(path.resolve(__dirname, "../day1"));

fs.readFile(path.resolve(__dirname, "../day2/module2.js"), function(err, data) {
    if (err) {
        console.error("读取文件方式3", err);
    } else {
        console.log("成功利用方式3读取文件")
    }
});