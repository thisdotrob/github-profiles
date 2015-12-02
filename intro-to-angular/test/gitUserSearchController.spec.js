angular.module('mock.search', []).
  factory('Search', function($q){
    var search = {};
    search.query = function(searchterm) {
      return $q.when("test");
    };
    return search;
  });



describe('GitUserSearchController', function() {

  var ctrl;
  var scope;

  beforeEach(module('GitUserSearch'));

  beforeEach(module('mock.search'));

  beforeEach(inject(function($controller, $rootScope, _Search_){
    scope = $rootScope.$new();
    ctrl = $controller('GitUserSearchController', {
      $scope: scope,
      Search: _Search_
    });
  }));

  beforeEach(inject(function($controller) {
    ctrl = $controller('GitUserSearchController');
  }));

  it('initialises with an empty search result and term', function() {
    expect(ctrl.searchResult).toBeUndefined();
    expect(ctrl.searchTerm).toBeUndefined();
  });


  describe('when searching for a user', function() {

    // var httpBackend;
    //
    // beforeEach(inject(function($httpBackend) {
    //   httpBackend = $httpBackend;
    //   httpBackend
    //     .expectGET("https://api.github.com/search/users?access_token="+token+"&q=hello")
    //     .respond(
    //       { items: items }
    //     );
    // }));
    //
    // afterEach(function() {
    //   httpBackend.verifyNoOutstandingExpectation();
    //   httpBackend.verifyNoOutstandingRequest();
    // });

    it('displays search results', function() {
      ctrl.searchTerm = 'hello';
      ctrl.doSearch();
      console.log(ctrl.searchResult);
      expect(ctrl.searchResult.items).toEqual(items);
    });
  });
});
