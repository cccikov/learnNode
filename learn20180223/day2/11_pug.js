/**
 * Jade 已经改名为 Pug
 * 中文文档 https://pug.bootcss.com/api/getting-started.html
 */


var pug = require('pug');
var http = require('http');
var fs = require('fs');
var static = require('./static');



/**
 * 方法1
 * // compile
 * var fn = pug.compile('string of pug', options);
 * var html = fn(data);
 *
 *
 * 方法2
 * // render
 * var html = pug.render('string of pug', merge(options, data));
 *
 * merge(options, data) 是指 选项option 和 数据data都写在这个对象
 * merge 是 合并的意思
 *
 *
 *
 *
 * 方法3
 * // renderFile
 * var html = pug.renderFile('filename.pug', merge(options, data));
 */
{
    let template = pug.compile('title=title', {});
    let html = template({
        title: "方法1"
    });
    console.log(html);
}

{
    let html = pug.render('title=title', {
        title: "方法2"
    });
    console.log(html);
}

{
    let html = pug.renderFile('./11_pug.pug', {
        title: "方法3"
    });
    console.log(html);
}
