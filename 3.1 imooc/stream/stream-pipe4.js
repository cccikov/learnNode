/*定制可读流 定制可读流 定制转换流*/
var stream = require('stream');
var util = require('util');


// 定制可读流
function ReadStream(){
    stream.Readable.call(this);//继承实例方法属性
}
util.inherits(ReadStream, stream.Readable);//让ReadStream 继承 stream.Readable的原型
ReadStream.prototype._read = function(){
    this.push('what ');
    this.push('the ');
    this.push('fuck \n');
    this.push(null);
}


// 定制可写流
function WriteStream(){
    stream.Writable.call(this);//继承实例方法属性
    this._cached = new Buffer('');
}
util.inherits(WriteStream, stream.Writable);//让ReadStream 继承 stream.Readable的原型
WriteStream.prototype._write = function(chunk , encode , cb){
    console.log(chunk.toString());
    cb();
}

// 定制转换流
function TransformStream(){
    stream.Transform.call(this);
}
util.inherits(TransformStream,stream.Transform)
TransformStream.prototype._transform = function(chunk,encode,cb){
    this.push(chunk);
    cb();
}
TransformStream.prototype._flush = function(cb){
    this.push('oh Yeah');
    cb();
}

var rs = new ReadStream();
var ws = new WriteStream();
var ts = new TransformStream();

rs.pipe(ts).pipe(ws);
/*
what
the
fuck

oh Yeah
*/