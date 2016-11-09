/*read write*/
var Readable = require('stream').Readable
var Writable = require('stream').Writable

var readStream = new Readable();
var writeStream = new Writable();

readStream.push('what ');
readStream.push('the ');
readStream.push('fuck \n ');
readStream.push(null);
writeStream._write = function(chunk, encode, cb) {//重写writeStream的方法_write
    console.log(chunk.toString());
    cb();
}

readStream.pipe(writeStream);
/*  what
    the
    fuck

*/
