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
  getMatchingLogins(searchTerm);
});

server.listen(8080);

function getMatchingLogins(searchTerm) {
  var path = 'https://api.github.com/search/users';
  var accessToken = 'redacted';
  var params = '?access_token=' + accessToken + '&q=' + searchTerm;
  var options = { url: path + params,
                  headers: {'user-agent': 'node.js'}
                };
  request(options, function(error, apiRes, body) {
    if(!error && apiRes.statusCode == 200) {
      var searchResults = JSON.parse(body).items;
      var logins = [];
      for (var i = 0; i < searchResults.length; i++) {
        logins.push(searchResults[i].login);
      }
      getUserDetails(logins);
    }
  });
}

function getUserDetails(logins) {
  for (var i = 0; i < logins.length; i++) {
    options = { url: 'https://api.github.com/users/' + logins[i],
                headers: {'user-agent': 'node.js'}
    };
    request(options, addUserDetails);
  }
}

var results;

function addUserDetails(error, response, body) {
  if(!error && apiRes.statusCode == 200) {
    parsed = JSON.parse(body);
    results.push({
      login: parsed.login,
      avatar_url: parsed.avatar_url + '&s=150',
      html_url: parsed.html_url,
      name: parsed.name,
      location: parsed.location,
      public_repos: parsed.public_repos,
      followers: parsed.followers,
      following: parsed.following
    });
    console.log(results);
    // clientResponse.writeHead(200, {"Content-Type": "application/json"});
    // clientResponse.end(JSON.stringify(detailedResults));
  }
}



function addDetailsToResults(error, apiRes, body){

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
