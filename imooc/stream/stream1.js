/*Buffer是用来保存原始数据,stream是用来暂存和移动数据*/
// fs.readFile是将整个文件放到内存中,对于小文件可以,但是对于大文件好容易就将内存占满了;或者多个客户端同时读取文件;这时候就要通过stream(流)边读取边处理
// stream是Buffer形式存在

var fs = require('fs');
var source = fs.readFileSync('../buffer/man.jpg');

fs.writeFileSync('steam_copy_man.jpg',source);