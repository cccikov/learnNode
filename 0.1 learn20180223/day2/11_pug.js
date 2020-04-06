/**
 * Jade 已经改名为 Pug
 * 中文文档 https://pug.bootcss.com/api/getting-started.html
 */


var pug = require('pug');


/**
 * 方法1
 * // compile
 * var fn = pug.compile('string of pug', options);
 * var html = fn(data);
 *
 * 可以将编译成功的模板存起来，然后通过添加不同的数据，最终渲染出内容不一样的html，如果是使用同一编译的模板，不同数据渲染，
 * 使用方法1 性能是最佳的 因为会减少了编译过程
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
    // 方法1 需要渲染不同的数据，推荐方法1
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
    // 只渲染一次，推荐方法3
    let html = pug.renderFile('./11_pug.pug', {
        title: "方法3"
    });
    console.log(html);
}
