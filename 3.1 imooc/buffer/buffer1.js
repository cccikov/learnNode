/*创建Buffer*/
var a = new Buffer('hello 慕课网'); //默认是按照utf-8的格式进行转化的
var b = new Buffer('hello 慕课网', 'utf-8'); //
var c = new Buffer('hello 慕课网', 'base64');
console.log(a, b, c);
//<Buffer 68 65 6c 6c 6f 20 e6 85 95 e8 af be e7 bd 91>
//<Buffer 68 65 6c 6c 6f 20 e6 85 95 e8 af be e7 bd 91>
//<Buffer 85 e9 65 a1 44>

a = new Buffer("索索");
console.log(a.length); //6 一个中文3个字节(bft-8)
console.log(Buffer.byteLength('索索', 'utf8')); //6
for (var i = 0; i < a.length; i++) {
    console.log(a[i]);
    /* 231
     * 180
     * 162
     * 231
     * 180
     * 162
     */
}
var d = new Buffer([1,1,2,23,5,6.0001]);
console.log(d);//<Buffer 01 01 02 17 05 06>
console.log(d[3]);//23
console.log(d[5])//6  小数点后都不会显示


/*写入数据*/
var buf = new Buffer(8);
console.log(buf.length); //8
buf.write("1234567890");
console.log(buf); //<Buffer 31 32 33 34 35 36 37 38> 多出的部分不会被缓存到

/*读取数据*/
var buf2 = new Buffer('asdasdas456784648');
console.log(buf2);//<Buffer 61 73 64 61 73 64 61 73 34 35 36 37 38 34 36 34 38>
console.log(buf2.toString('utf8'));//asdasdas456784648 默认是uft8编码


/*数据操作*/
// copy
var buf3 = new Buffer("hello imooc");
var buf4 = new Buffer(5);
buf3.copy(buf4);
console.log(buf4.toString()); //hello
buf3.copy(buf4, 1, 6, 11);
console.log(buf4.toString()); //himoo

// concat 合并
var buf5 = Buffer.concat([buf3, buf4]); //合并必须是一个Buffer数组
console.log(buf5.toString()); //hello imoochimoo

//compare 比较
var buffer1 = new Buffer('ABC');
var buffer2 = new Buffer('ABCD');
var result = buffer1.compare(buffer2);

if (result < 0) {
    console.log(buffer1 + " 在 " + buffer2 + "之前");//ABC 在 ABCD之前

} else if (result == 0) {
    console.log(buffer1 + " 与 " + buffer2 + "相同");
} else {
    console.log(buffer1 + " 在 " + buffer2 + "之后");
}

// slice 剪切
var buf6 = buf5.slice();
console.log(buf6.toString());//hello imoochimoo

var buf7 = buf5.slice(1,7);
console.log(buf7.toString());//ello i