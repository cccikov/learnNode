/**
 * MD5
 * MD5是一种不可逆运算的加密算法，不是随机的，同一个密码算出来的结果一样
 */
var crypto = require('crypto');
var md5 = crypto.createHash("md5");
md5.update("1123123123123");
var str = md5.digest('hex'); // base64 latin1
console.log(str)

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