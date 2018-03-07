var some_module = require("./module2");
console.log(some_module);

console.log(some_module.a)
some_module.fn();

var bluebird = require("bluebird"); // 没有 ./ ../ / 路径符 , 又不是node的核心模块 , 就是在 当前js文件的父目录的node_modules/ 里面找 , 如果还是没有找到，则移动到再上一层父目录，直到文件系统的根目录。
console.log(bluebird);

console.log("02_module.js是否是直接执行的",require.main === module);