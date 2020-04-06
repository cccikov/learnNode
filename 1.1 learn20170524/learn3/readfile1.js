/**
 * Nodejs 入门 读取文件1 - 异步
 */

var fs = require('fs');
fs.readFile('./theFile.txt', "utf-8", function(err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
    }
});
console.log('end');

// end
// 我是file内容