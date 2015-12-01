githubUserSearch.controller('GitUserSearchController', [function(){

  var self = this;

  self.doSearch = function() {
    self.searchResult = {
      "items": [
        { "login": "thisdotrob",
          "avatar_url": "https://avatars3.githubusercontent.com/u/12902589?v=3",
          "html_url": "https://github.com/thisdotrob"
        },
        { "login": "jbhdeconinck",
          "avatar_url": "https://avatars1.githubusercontent.com/u/14220697?v=3",
          "html_url": "https://github.com/jbhdeconinck"
        }
      ]
    };
  };

}]);
