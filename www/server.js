var http = require('http');
var connect = require('connect');
var app = connect()
    .use(connect.logger('dev'))
    .use(function (req, res, next) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        next();
    })
    .use(connect.static(__dirname));

var server = http.createServer(app);
server.listen(8081, "0.0.0.0", function () {
    console.log('server is listening');
});