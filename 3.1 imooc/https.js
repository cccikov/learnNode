var https = require('https');
var fs = requir('fs');

var options={
    key:fs.readFileSync('ssh_key.pem');
    cert:fs.readFileSync('ssh_cert.pem');
}
https.createServer(options , function(req,res){
    res.writeHead(200);
    res.end('hello immoc');
}).listen(8090);
