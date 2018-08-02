/**
 * MD5
 * MD5是一种不可逆运算的加密算法，不是随机的，同一个密码算出来的结果一样
 */
var crypto = require('crypto');
var md5_crypto = crypto.createHash("md5");
md5_crypto.update("1123123123123");
var str = md5_crypto.digest('hex'); // base64 latin1
console.log(str)

/**
 * @param data 需要加密的字符串
 * @return md5加密的密文
 */
function md5(data) {
    let md5_crypto = crypto.createHash("md5");
    md5_crypto.update(data);
    return md5_crypto.digest('hex');
}

console.log(md5("1"));
console.log(md5("a"));
console.log(md5("1"));

var fs = require("fs");
fs.readFile(__dirname + "/03_md5.js", function (err, buf) {
    console.log(md5(buf)); // 二进制数据也可以加密为md5，由于文件一改变，md5值也会改变，所以可以通过md5来确认是否是同一件文件
});

/*
Node.js 目前支持的字符编码包括：

'ascii' - 仅支持 7 位 ASCII 数据。如果设置去掉高位的话，这种编码是非常快的。

'utf8' - 多字节编码的 Unicode 字符。许多网页和其他文档格式都使用 UTF-8 。

'utf16le' - 2 或 4 个字节，小字节序编码的 Unicode 字符。支持代理对（U+10000 至 U+10FFFF）。

'ucs2' - 'utf16le' 的别名。

'base64' - Base64 编码。当从字符串创建 Buffer 时，按照 RFC4648 第 5 章的规定，这种编码也将正确地接受“URL 与文件名安全字母表”。

'latin1' - 一种把 Buffer 编码成一字节编码的字符串的方式（由 IANA 定义在 RFC1345 第 63 页，用作 Latin-1 补充块与 C0/C1 控制码）。

'binary' - 'latin1' 的别名。

'hex' - 将每个字节编码为两个十六进制字符。

 */


// 因为同样的明文经过md5加密都会得到一样的密文，所以一些简单的明文的md5加密文。已经通过穷举的方法被破解了，如纯数字
console.log(md5("1"));
console.log(md5(md5("1"))); // MD5 的密文同样可以继续加密，但是简单的明文也同样已经被破解了

// 但是我们可以通过换了一下初次加密的密文的字符串排序，这个排序规律只有我们自己知道，所以别人就破解不了了

/**
 * @param str 用户输入的密码
 * @return 加密后的密码
 */
function md5_password(str) {
    let first_md5 = md5(str);
    let front = first_md5.substr(0, 16); // 密文的前一半
    let back = first_md5.substr(16, 16); // 密文的后一半
    let new_md5 = back + front;// 前后顺序调换
    return md5(new_md5); // 再加密多一次
}
console.log(md5_password("1")); // 00f976c8f7c4156f8f857c358a03e314 我们就直接储存这个经过我们自己加密的密文

// 然后用户输入密码，我们再对用户输入的密码进行同样的加密，再和储存起来的密文进行对比，就可以判断用户是否输入正确的密码
var user_input = "1";
console.log(md5_password(user_input) == "00f976c8f7c4156f8f857c358a03e314");
