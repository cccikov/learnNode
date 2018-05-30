/**
 * Jade 已经改名为 Pug
 * 中文文档 https://pug.bootcss.com/api/getting-started.html
 */


var pug = require('pug');
var http = require('http');
var fs = require('fs');
var static = require('./static');



/**
 * // compile
 * var fn = pug.compile('string of pug', options);
 * var html = fn(locals);
 *
 * // render
 * var html = pug.render('string of pug', merge(options, locals));
 *
 * // renderFile
 * var html = pug.renderFile('filename.pug', merge(options, locals));
 */


var html = pug.renderFile('./11_pug.pug');
console.log(html);




// 创建服务器
http.createServer(function(req, res) {
    if (req.url == "/") {
        var html = pug.renderFile('./11_pug.pug') ;
        res.end(html);
    }
}).listen(3000);