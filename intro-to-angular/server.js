var express = require('express');
var app = express();
var server = require('http').createServer(app);
var path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (request, response) {
  response.sendFile(__dirname + '/index.html');
});

server.listen(8080);
