var fs = require("fs");
fs.readFile("./abc.html", function (error) {
    console.log(error); // 这个错误属于系统错误 SystemError ； 系统错误是由扩展的 Error 对象加上附加属性表现的。
    console.log(error.info); // 可能会有的一个属性
    console.log(error.code); //  error.code 属性是一个表示错误码的字符串，总是 E 带上一串大写字母。
    console.log(error.errno); //  error.errno 属性是一个数值或字符串。 如果返回一个数值，则数值是一个负数，对应 libuv 错误处理 中定义的错误码。 详见 uv-errno.h 头文件（Node.js 源代码中的 deps/uv/include/uv-errno.h）。 如果返回一个字符串，则同 error.code。
    console.log(error.syscall); //   属性是一个字符串，描述失败的 系统调用。
    console.log(error.path); //  错误出现时 (比如 在 fs 或 child_process), error.path属性是一个字符串，包含了相关不可用路径名。


    console.log(error.message); // error.message 属性是错误的字符串描述，通过调用 new Error(message) 设置。 传给构造函数的 message 也会出现在 Error 的堆栈跟踪的第一行。 但是，Error 对象创建后改变这个属性可能不会改变堆栈跟踪的第一行（比如当 error.stack 在该属性被改变之前被读取）。
    console.log(error.stack); // error.stack 属性是一个字符串，描述代码中 Error 被实例化的位置。由于可能是系统级的错误，所就没有描述位置
    console.log(error.stack == error.toString()); // true error.stack 属性是一个字符串，描述代码中 Error 被实例化的位置。由于可能是系统级的错误，系统级的错误是由扩展的 Error 实例产生的 , 所就没有描述位置
});

let err = new Error("haha");
console.log(err);
console.log(err.stack); // error.stack 属性是一个字符串，描述代码中 Error 被实例化的位置。
console.log(err.stack == err.toString()); // false