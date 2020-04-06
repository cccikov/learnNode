var a = 100;

// 其实 变量exports 就是指向 module.exports 
// 真正暴露模块接口的是 module对象里面exports属性

/*
* exports 变量是在模块的文件级别作用域内有效的，它在模块被执行前被赋予 module.exports 的值。
* 它有一个快捷方式，以便 module.exports.f = ... 可以被更简洁地写成 exports.f = ...。 注意，就像任何变量，如果一个新的值被赋值给 exports，它就不再绑定到 module.exports：
*/

// exports 一般是用于暴露一堆接口
exports.a = a;
exports.fn = function(){
    console.log("exports");
}

console.log("module2.js是否是直接执行的",require.main === module);



