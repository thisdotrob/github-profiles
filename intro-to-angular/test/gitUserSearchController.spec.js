describe('GitUserSearchController', function(){
  beforeEach(module('GitUserSearch'));

  var ctrl;

  beforeEach(inject(function($controller) {
    ctrl = $controller('GitUserSearchController');
  }));

  it('initialises with an empty search result and term', function() {
    expect(ctrl.searchResult).toBeUndefined();
    expect(ctrl.searchTerm).toBeUndefined();
  });

  describe('when searching for a user', function(){
    var url = "https://api.github.com/search/users?access_token=" + token + "&q=searchterm";
    console.log(url);
    var httpBackend;
    beforeEach(inject(function($httpBackend) {
      httpBackend = $httpBackend;
      httpBackend
        .when("GET", url)
        .respond({items: items});
    }));

    var items = [
      { "login": "thisdotrob",
        "avatar_url": "https://avatars3.githubusercontent.com/u/12902589?v=3",
        "html_url": "https://github.com/thisdotrob"
      },
      { "login": "jbhdeconinck",
        "avatar_url": "https://avatars1.githubusercontent.com/u/14220697?v=3",
        "html_url": "https://github.com/jbhdeconinck"
      }
    ];

    it('displays search results', function(){
      ctrl.searchTerm ='searchterm';
      ctrl.doSearch();
      httpBackend.flush();
      expect(ctrl.searchResult.items).toEqual(items);
    });
  });

});
