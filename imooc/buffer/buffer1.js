var a = new Buffer('hello 慕课网');//默认是按照utf-8的格式进行转化的
var b = new Buffer('hello 慕课网','utf-8');//
var c = new Buffer('hello 慕课网','base64');
console.log(a,b,c);
//<Buffer 68 65 6c 6c 6f 20 e6 85 95 e8 af be e7 bd 91>
//<Buffer 68 65 6c 6c 6f 20 e6 85 95 e8 af be e7 bd 91>
//<Buffer 85 e9 65 a1 44>


var buf = new Buffer(8);
console.log(buf.length);//8
buf.write("1234567890");
console.log(buf);//<Buffer 31 32 33 34 35 36 37 38> 多出的部分不会被缓存到

var buf2 = new Buffer([1,2,3,4,5,6.001123]);
console.log(buf2);//<Buffer 01 02 03 04 05 06>  小数点后都不会显示
