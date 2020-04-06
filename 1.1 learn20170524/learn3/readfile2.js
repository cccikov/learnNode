/**
 * Nodejs 入门 读取文件1 - 同步
 */

var fs = require('fs');
var data = fs.readFileSync('./theFile.txt', "utf-8");
console.log(data);
console.log("end");

// 我是file内容
// end