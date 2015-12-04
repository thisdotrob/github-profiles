var express = require('express');
var app = express();
var server = require('http').createServer(app).listen(8080);
var path = require('path');
var request = require('request');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

var clientResponse;
var accessToken = 'redacted';
var apiRequestsRemaining = 0;
var results = [];

app.post('/', function (req, res) {
  var searchTerm = req.query.searchTerm;
  clientResponse = res;
  getMatchingLogins(searchTerm);
});

function getMatchingLogins(searchTerm) {
  var path = 'https://api.github.com/search/users';
  var params = '?access_token=' + accessToken + '&q=' + searchTerm;
  var options = { url: path + params, headers: {'user-agent': 'node.js'} };
  request(options, function(error, apiRes, body) {
    if(!error && apiRes.statusCode == 200) {
      var searchResults = JSON.parse(body).items;
      var logins = [];
      for (var i = 0; i < searchResults.length; i++) {
        logins.push(searchResults[i].login);
      }
      apiRequestsRemaining = logins.length;
      getUserDetails(logins);
    }
  });
}

function getUserDetails(logins) {
  for (var i = 0; i < logins.length; i++) {
    var path = 'https://api.github.com/users/';
    options = { url: path + logins[i] + '?access_token=' + accessToken,
                headers: {'user-agent': 'node.js'} };
    request(options, addUserDetails);
  }
}

var addUserDetails = function (error, response, body) {
  if(!error && response.statusCode == 200) {
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
    apiRequestsRemaining--;
    if (apiRequestsRemaining === 0) {
      clientResponse.end(JSON.stringify(results));
      results = [];
    }
  }
};
