var express = require('express');
var app = express();
var server = require('http').createServer(app);
var path = require('path');
var request = require('request');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.post('/', function (req, res) {
  var path = 'https://api.github.com/search/users';
  var accessToken = 'redacted';
  var searchTerm = req.query.searchTerm;

  var options = {
    url: path + '?access_token=' + accessToken + '&q=' + searchTerm,
    headers: {'user-agent': 'node.js'}
  };

  request(options, function(error, apiRes, body) {
    if(!error && apiRes.statusCode == 200) {
      res.writeHead(200, {"Content-Type": "application/json"});
      res.end(body);
    }
  });

});

server.listen(8080);
