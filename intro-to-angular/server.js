var express = require('express');
var app = express();
var server = require('http').createServer(app);
var path = require('path');
var request = require('request');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

var cientResponse;

app.post('/', function (req, res) {
  var searchTerm = req.query.searchTerm;
  clientResponse = res;
  getResults(searchTerm);
});

server.listen(8080);

function getResults(searchTerm) {
  var path = 'https://api.github.com/search/users';
  var accessToken = 'f8febf51ed85f20f400d3052944f2ea129c0a284';
  var params = '?access_token=' + accessToken + '&q=' + searchTerm;
  var options = { url: path + params,
                  headers: {'user-agent': 'node.js'}
                };
  request(options, function(error, apiRes, body) {
    if(!error && apiRes.statusCode == 200) {
      var searchResults = JSON.parse(body).items;
      var basicResults = [];
      for (var i = 0; i < searchResults.length; i++) {
        result = searchResults[i];
        basicResults.push({
          avatar_url: result.avatar_url,
          login: result.login,
          html_url: result.html_url
        });
      }
      getDetailsForResults(basicResults);
    }
  });
}

function getDetailsForResults(basicResults, clientResponse) {
  detailedResults = [];
  for(var i = 0; i < basicResults.length; i++) {
    basicResult = basicResults[i];
    options = { url: 'https://api.github.com/users/' + basicResult.login,
                headers: {'user-agent': 'node.js'}
              };
    request(options, addDetailsToResults);
  }

  // clientResponse.writeHead(200, {"Content-Type": "application/json"});
  // clientResponse.end(JSON.stringify(detailedResults));
}

function addDetailsToResults(error, apiRes, body){
  if(!error && apiRes.statusCode == 200) {
    parsedBody = JSON.parse(body);
    var details = {
        login: parsedBody.login,
        followers: parsedBody.followers,
        following: parsedBody.following
    };
    console.log(details);
    //How to get these details back into the client response?
  }
}
